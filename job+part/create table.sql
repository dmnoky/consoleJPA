--drop table CX_CALL_SEND_HS
-- Create table
create table CX_CALL_SEND_HS
(
  row_id           VARCHAR2(15 CHAR) not null,
  created          DATE default sysdate not null,
  created_by       VARCHAR2(15 CHAR) not null,
  last_upd         DATE default sysdate not null,
  last_upd_by      VARCHAR2(15 CHAR) not null,
  modification_num NUMBER(10) default 0 not null,
  conflict_id      VARCHAR2(15 CHAR) default '0' not null,
  db_last_upd      DATE,
  wso_load_dt      DATE,
  cl_name          VARCHAR2(100 CHAR),
  cl_send_id       VARCHAR2(60 CHAR),
  cl_xml_id        VARCHAR2(15 CHAR),
  cx_log_id        VARCHAR2(15 CHAR),
  db_last_upd_src  VARCHAR2(50 CHAR),
  wso_error        VARCHAR2(1000 CHAR),
  wso_status       VARCHAR2(10 CHAR)
)
tablespace DATA01
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  )
--START Custom NOVIKOVDK MKB-245197 15102021
PARTITION BY RANGE(created) INTERVAL (INTERVAL '1' DAY) --14/28
SUBPARTITION BY LIST(wso_status) 
SUBPARTITION TEMPLATE( 
            SUBPARTITION sp_err_status VALUES ('Ошибка', 'NULL', null),
            SUBPARTITION sp_suc_status VALUES ('Выполнено'))
(PARTITION P_CRT_MIN VALUES LESS THAN (TO_DATE('01.01.2021','DD.MM.YYYY')))
ENABLE ROW MOVEMENT;
--END Custom
-- Create/Recreate indexes 
create unique index CX_CALL_SEND_HS_P1 on CX_CALL_SEND_HS (ROW_ID)
  tablespace DATA01
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );
-- Grant/Revoke object privileges 
grant select, insert, update, delete on CX_CALL_SEND_HS to SSE_ROLE;