CREATE OR REPLACE FUNCTION GetZabbixSLA_Retail_3_4_3(T_ZABBIX IN number, MAX_OPRERATION_TIME IN number)
    RETURN Zabbix_Operations_Set AS zabbix_record Zabbix_Operations_Set;
BEGIN
SELECT Zabbix_Operations(
nvl(sum( case when ERROR_CODE is null and end_dt is not null and (end_dt - start_dt) * 86400 <= MAX_OPRERATION_TIME then 1 else 0 end ),0), -- OPERATIONS_SUCCESS
nvl(sum( case when ERROR_CODE is not null then 1 else 0 end ),0), -- OPERATIONS_ERROR
nvl(sum( case when ERROR_CODE is null and ((end_dt- start_dt) * 86400 > MAX_OPRERATION_TIME or end_dt is null) then 1 else 0 end ),0), -- OPERATIONS_TIMEOUT
nvl(ROUND(avg( nvl(end_dt, sysdate-3/24) - start_dt) * 864000) / 10, 0) -- OPERATIONS_AVG_DURATION
)
 BULK COLLECT INTO zabbix_record
 FROM (SELECT CAST(T.OPERATION_TS AS DATE) START_DT, T.ERROR_CODE || (SELECT T1.ERROR_CODE FROM SIEBEL.CX_SLA_LOG T1 WHERE T1.OPERATION_ID = T.OPERATION_ID AND T1.OPERATION_EVENT_TYPE = '2') ERROR_CODE, (SELECT CAST(T2.OPERATION_TS AS DATE) FROM SIEBEL.CX_SLA_LOG T2 WHERE T2.OPERATION_ID = T.OPERATION_ID AND OPERATION_EVENT_TYPE = '2') END_DT
         FROM SIEBEL.CX_SLA_LOG T
        WHERE T.CONTEXT IN ('Service Request detail view w/attachments','MKB Executive Appoitment Claim View','MKB SR Consideration Result Claim View','MKB SR Consideration Result View', 'Service Request Detail Applet', 'MKB SR Toggle Detail Form Applet') -- ++Service Request Detail Applet, MKB SR Toggle Detail Form Applet NOVIKOVDK MKB-362281 19082022
          AND T.OPERATION_EVENT_TYPE = '1'
          AND T.OPERATION_TS >= TRUNC(SYSDATE, 'MI') -3/24 - (T_ZABBIX + MAX_OPRERATION_TIME)/(86400)  -- BEGIN_OPERATION
          AND T.OPERATION_TS < TRUNC(SYSDATE, 'MI') -3/24 - (MAX_OPRERATION_TIME)/(86400));              -- END_OPERATION
RETURN zabbix_record;
EXCEPTION
   WHEN OTHERS THEN
      SELECT Zabbix_Operations(null,null,null, null) BULK COLLECT INTO zabbix_record FROM DUAL; --null на графике будут означать ошибку в запросе
END;
----------------------------------------------------------------------------------------------------------------------------------------
SELECT OPERATIONS_SUCCESS, OPERATIONS_ERROR, OPERATIONS_TIMEOUT FROM TABLE(GetZabbixSLA_Retail_3_4_3(3000,5 ));