create table MKB_312747_temp as select * from CX_ORG_EXCEPTN WHERE PRODUCT_TYPE = 'Депозит';
update MKB_312747_temp 
set row_id = siebel.s_sequence_pkg.get_next_rowid(), 
    PRODUCT_TYPE = 'Накопительный счет';
commit;   
INSERT INTO CX_ORG_EXCEPTN SELECT * FROM MKB_312747_temp;
commit;
drop table MKB_312747_temp;
---------------------------------------------------------------------------------
create table MKB_312747_temp_inter as select t1.* from CX_EXCPTN_CURCY t1, CX_ORG_EXCEPTN t2
where t1.exception_id = t2.row_id and t2.PRODUCT_TYPE = 'Депозит';
alter table SIEBEL.MKB_312747_temp_inter add "EXCEPT" varchar2(15 char);

merge into MKB_312747_temp_inter d
  using (select f.row_id, 
                f.org_id
           from CX_ORG_EXCEPTN f
          where f.product_type = 'Депозит'
         ) s
  on (d.exception_id = s.row_id)
  when matched then
    update
       set d.row_id  = siebel.s_sequence_pkg.get_next_rowid(),
           d.EXCEPT = (select te.row_id from CX_ORG_EXCEPTN te 
                          where te.org_id = s.org_id 
                          AND te.product_type = 'Накопительный счет'
                          AND TE.OPERATION_FLAG = 'Y'
                          AND TE.INDIVIDUAL_FLAG = 'Y');
commit;
update MKB_312747_temp_inter set exception_id = EXCEPT;
commit;
alter table MKB_312747_temp_inter drop column EXCEPT;
INSERT INTO CX_EXCPTN_CURCY SELECT * FROM MKB_312747_temp_inter;
commit;
drop table MKB_312747_temp_inter;