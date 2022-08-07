package sberJPA.controller;

import org.springframework.beans.factory.annotation.Autowired;
import sberJPA.model.user.ParentC;
import sberJPA.service.user.UserService;
import sberJPA.util.reader.ReaderFactory;
import sberJPA.util.reader.exception.IncompleteOperationException;


public class ParentController extends MainController<ParentC> {
    @Autowired
    public void setParentService(UserService<ParentC> parentService) {
        super.mainService = parentService;
    }

    /**  /add parent */
    @Override
    public ParentC add() {
        try {
            if (useActiveT()) return currT;
            else currT = new ParentC();
            currT.setLastName(ReaderFactory.STRING_READER.read("Введите фамилию..."));
            currT.setFirstName(ReaderFactory.STRING_READER.read("Введите имя..."));
            currT.setMiddleName(ReaderFactory.STRING_READER.read("Введите отчество..."));
            onlySetAddress();
            onlyAddChild();
            mainService.add(currT);
        } catch (IncompleteOperationException ignore) { /*save*/ }
        return currT;
    }

    /** /parent set address */
    public ParentC setAddress() throws IncompleteOperationException {
        if (!useActiveT()) return add();
        return onlySetAddress();
    }

    private ParentC onlySetAddress() throws IncompleteOperationException {
        System.out.println("Введите айди адреса...");
        currT.setAddress(ControllerFactory.getAddressController().getFromList());
        return currT;
    }

    /** /parent add child */
    public ParentC addChild() throws IncompleteOperationException {
        if (!useActiveT()) return add();
        return onlyAddChild();
    }

    private ParentC onlyAddChild() throws IncompleteOperationException {
        while (ReaderFactory.BOOLEAN_READER.read("Добавить ребенка?")) {
            currT.addChild(ControllerFactory.getChildController().getFromList());
        }
        return currT;
    }

}
