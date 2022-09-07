CREATE OR REPLACE PROCEDURE GET_STATUS_FROM_WSO(CL_XML_ID_ IN VARCHAR2, CL_SEND_ID_ IN VARCHAR2, WSO_STATUS_ IN VARCHAR2, WSO_ERROR_ IN VARCHAR2, STATUS OUT VARCHAR2) AS
  --NOVIKOVDK MKB-245197 12102021     
  BEGIN
    STATUS := 'Error';
    IF CL_XML_ID_ IS NULL OR CL_SEND_ID_ IS NULL OR WSO_STATUS_ IS NULL THEN
      RETURN;
    END IF;

    UPDATE siebel.CX_CALL_SEND_HS hs
    SET    hs.WSO_STATUS = WSO_STATUS_, hs.WSO_ERROR = WSO_ERROR_, hs.WSO_LOAD_DT = sysdate
    WHERE  hs.CL_XML_ID = CL_XML_ID_ AND hs.CL_SEND_ID = CL_SEND_ID_; 
    IF sql%rowcount>0 THEN
      STATUS := 'Done';
    END IF;
    COMMIT;      
END; 

/*
DECLARE
STATUS VARCHAR2(10);
BEGIN
siebel.GET_STATUS_FROM_WSO('какой-то CL_XML_ID', 'какой-то CL_SEND_ID_', 'что-то из NULL / Выполнено / Ошибка', 'комемнт', STATUS);
dbms_output.put_line(STATUS);
END;
*/

--GRANT EXECUTE ON siebel.GET_STATUS_FROM_WSO TO NOVIKOVDK
   
/*
-- Create the user 
create user ADAPTER
  default tablespace DATA01
  temporary tablespace TEMP
  profile DEFAULT;
-- Grant/Revoke object privileges 
grant execute on GET_STATUS_FROM_WSO to ADAPTER;
-- Grant/Revoke role privileges 
grant sse_role to ADAPTER;
*/