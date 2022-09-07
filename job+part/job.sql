begin
  sys.dbms_scheduler.create_job(job_name            => 'SIEBEL.CLEAR_PARTN_CALL_SEND_HS_ERR',
                                job_type            => 'PLSQL_BLOCK',
                                job_action          => 'BEGIN
                                                          execute immediate ''ALTER TABLE SIEBEL.CX_CALL_SEND_HS TRUNCATE PARTITION p_err_status'';
                                                          execute immediate ''ALTER INDEX CX_CALL_SEND_HS_P1 REBUILD'';
                                                        END;',
                                start_date          => SYSTIMESTAMP,
                                repeat_interval     => 'Freq=Weekly;Interval=4',
                                end_date            => TO_DATE(null),
                                job_class           => 'DEFAULT_JOB_CLASS',
                                enabled             => true,
                                auto_drop           => false,
                                comments            => 'NOVIKOVDK MKB-245197 15102021 раз в 4 недели чистим CX_CALL_SEND_HS.WSO_STATUS=Ошибка OR null');
end;
/

begin
  sys.dbms_scheduler.create_job(job_name            => 'SIEBEL.CLEAR_PARTN_CALL_SEND_HS_SUC',
                                job_type            => 'PLSQL_BLOCK',
                                job_action          => 'BEGIN
                                                          execute immediate ''ALTER TABLE SIEBEL.CX_CALL_SEND_HS TRUNCATE PARTITION p_suc_status'';
                                                          execute immediate ''ALTER INDEX CX_CALL_SEND_HS_P1 REBUILD'';
                                                        END;',
                                start_date          => SYSTIMESTAMP,
                                repeat_interval     => 'Freq=Weekly;Interval=2',
                                end_date            => TO_DATE(null),
                                job_class           => 'DEFAULT_JOB_CLASS',
                                enabled             => true,
                                auto_drop           => false,
                                comments            => 'NOVIKOVDK MKB-245197 15102021 раз в 2 недели чистим CX_CALL_SEND_HS.WSO_STATUS=Выполнено');
end;
/