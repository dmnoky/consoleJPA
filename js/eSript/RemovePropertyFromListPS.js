//NOVIKOVDK MKB-243975 06102021
/*
ChildPath = Чайлд.ГрандЧайлд.ГрандГрандЧайлд и так до ListOfChilds
PropertyName = <PropertyName> который удаляем у чайлдов листа
SiebelMessageIn
*/
function RemovePropertyFromListPS (Inputs: PropertySet, Outputs: PropertySet) {
	var oInputPS: PropertySet, oChildPS: PropertySet, oTmpChildPS: PropertySet;
	try {
		var oChildArray: Array = Inputs.GetProperty("ChildPath").split("."); 
		oInputPS = Inputs.GetChild(0);
		oChildPS = oInputPS;
		//Поиск конечного чайлда
		for (var i: float = 0; i < oChildArray.length; i++) {
			var j: float = 0, size: float = oChildPS.GetChildCount();
			while (true) {
				oTmpChildPS = oChildPS.GetChild(j);
				if (oTmpChildPS.GetType() == oChildArray[i]) { 
					oChildPS = oTmpChildPS;
					break;
				}
				if (++j == size) throw ("Не найден дочерний объект типа: " + oChildArray[i]);
			}
		}
		//Удаление пропа у конечного чайлда
		var propertyName: chars = Inputs.GetProperty("PropertyName");
		for (i = 0; i < oChildPS.GetChildCount(); i++) {
			oChildPS.GetChild(i).RemoveProperty(propertyName);
		}
		//Вывод
		oInputPS.SetType("Output");
		Outputs.AddChild(oInputPS.Copy());
	}
	finally {
		oChildArray = null;
		oTmpChildPS = null;
		oChildPS = null;
		oInputPS = null;
	}
}