select s.* from siebel.S_UI_OBJECT s, siebel.S_UI_OBJ_EXPR ss, siebel.S_UI_FILE sss, siebel.S_UI_OBJ_EXP_FL sm 
       where s.row_id=ss.UI_OBJECT_ID and (sm.UI_OBJ_EXPR_ID=ss.row_id and sm.UI_FILE_ID=sss.row_id) 
       and sss.NAME = 'siebel/custom/callcenter/MKBCCSubjectFormAppletNewPR.js'
       
       --'siebel/custom/MKBCCLeadProductFormAppletPR.js'



select sss.* from siebel.S_UI_OBJECT s, siebel.S_UI_OBJ_EXPR ss, siebel.S_UI_FILE sss, siebel.S_UI_OBJ_EXP_FL sm 
       where s.row_id=ss.UI_OBJECT_ID and (sm.UI_OBJ_EXPR_ID=ss.row_id and sm.UI_FILE_ID=sss.row_id) 
       and s.NAME = 'MKB CC Client Cards View'
       
       ---MKB CC New Lead Info Form Applet