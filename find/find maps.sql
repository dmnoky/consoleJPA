select s.NAME, s.SRC_INT_OBJ_NAME as "Исходный", s.DST_INT_OBJ_NAME as "Целевой", 
       ss.NAME, ss.Src_Int_Comp_Name as "Исходный", ss.DST_INT_COMP_NAME as "Целевой", ss.COMMENTS,
       sss.src_expr, sss.DST_INT_FLD_NAME, sss.COMMENTS
       from siebel.S_INT_OBJMAP s, siebel.S_INT_COMPMAP ss, siebel.S_INT_FLDMAP sss
       where s.row_id = ss.INT_OBJ_MAP_ID and ss.row_id = sss.INT_COMP_MAP_ID 
       --and sss.src_expr = '"Lead"'
       and sss.DST_INT_FLD_NAME = 'MKB CC Lead Draft Type' --MKB-215931
       --AND (sss.COMMENTS LIKE '%MKB-209001%' OR ss.COMMENTS LIKE '%MKB-209001%' OR s.COMMENTS LIKE '%MKB-209001%')