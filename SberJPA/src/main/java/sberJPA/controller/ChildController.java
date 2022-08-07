package sberJPA.controller;

import org.springframework.beans.factory.annotation.Autowired;
import sberJPA.model.user.ChildC;
import sberJPA.service.user.UserService;
import sberJPA.util.reader.ReaderFactory;
import sberJPA.util.reader.exception.IncompleteOperationException;

public class ChildController extends MainController<ChildC> {
    @Autowired
    public void setChildService(UserService<ChildC> childService) {
        super.mainService = childService;
    }

    /** /add child */
    @Override
    public ChildC add() {
        try {
            if (useActiveT()) return currT;
            else currT = new ChildC();
            currT.setLastName(ReaderFactory.STRING_READER.read("Введите фамилию..."));
            currT.setFirstName(ReaderFactory.STRING_READER.read("Введите имя..."));
            currT.setMiddleName(ReaderFactory.STRING_READER.read("Введите отчество..."));
            currT.setAge(ReaderFactory.INTEGER_READER.read("Введите кол-во лет..."));
            onlySetInstitution();
            onlyAddParent();
            mainService.add(currT);
        } catch (IncompleteOperationException ignore) { /*save*/ }
        return currT;
    }

    /** /child set institution */
    public ChildC setInstitution() throws IncompleteOperationException {
        if (!useActiveT()) return add();
        return onlySetInstitution();
    }

    private ChildC onlySetInstitution() throws IncompleteOperationException {
        System.out.println("Введите айди учреждения...");
        currT.setInstitution(ControllerFactory.getInstitutionController().getFromList());
        return currT;
    }

    /** /child add parent */
    public ChildC addParent() throws IncompleteOperationException {
        if (!useActiveT()) return add();
        return onlyAddParent();
    }

    private ChildC onlyAddParent() throws IncompleteOperationException {
        while (ReaderFactory.BOOLEAN_READER.read("Добавить родителя?")) {
            currT.addParent(ControllerFactory.getParentController().getFromList());
        }
        return currT;
    }


}
