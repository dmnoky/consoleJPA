select NAME, ACTION_ID, PARAM_VALUE from siebel.S_SRM_ACT_PARAM where NAME = 'Workflow Process Name' 
       and param_value in('MKB Lead Stage Send To Genesys');
select * from siebel.S_SRM_REQ_PARAM a, siebel.S_SRM_REQUEST b where a.REQ_ID=b.Row_Id and
       (a.VALUE in('MKB Change Allow Invalid Flg WF', 'MKB Allow Operation Extr Flag Dismissal')
       or a.req_id in('1-BG0INU1', '1-G4RQGMI', '1-BZRUZ22', '1-10EAC0I3'));
       
SELECT T1.ROW_ID AS JOB_ID,                 --Идентификатор
       T1.CREATED AS JOB_CREATED_DATA,      --Дата создания
       T2.DISPLAY_NAME AS JOB_NAME,         --Компонент/Задание
       TT1.SCHED_START_DT AS JOB_NEXT_START,--Дата след. запуска
       T1.RPT_INTERVAL AS JOB_INTERVAL,     --Интервал запуска
       T1.RPT_UOM AS JOB_INTERVAL_VAL,      --Дни или минуты
       A2.NAME AS JOB_TYPE,                 --Тип выполнения
       A1.VALUE AS JOB_TYPE_VAL,            --значение
       T1.DESC_TEXT AS JOB_COMMENT          --Комментарий
FROM SIEBEL.S_SRM_REQUEST T1
     LEFT JOIN SIEBEL.S_SRM_REQUEST TT1 ON T1.ROW_ID = TT1.PAR_REQ_ID AND TT1.STATUS = 'QUEUED' -- следующий запуск
     LEFT JOIN SIEBEL.S_SRM_ACTION T2 ON T1.ACTION_ID = T2.ROW_ID
     LEFT JOIN SIEBEL.S_SRM_REQ_PARAM A1 ON T1.PAR_REQ_ID = A1.REQ_ID
     LEFT JOIN SIEBEl.S_SRM_ACT_PARAM A2 ON A1.ACTPARAM_ID = A2.ROW_ID
WHERE 1=1
    AND T1.REQ_TYPE_CD IN ('RPT_PARENT','RPT_INSTANCE')
    AND T1.STATUS = 'ACTIVE' and A1.VALUE ='MKB Lead Stage Send To Genesys'