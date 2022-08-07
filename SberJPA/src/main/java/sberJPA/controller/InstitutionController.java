package sberJPA.controller;

import org.springframework.beans.factory.annotation.Autowired;
import sberJPA.model.other.Institution;
import sberJPA.service.MainService;
import sberJPA.util.reader.ReaderFactory;
import sberJPA.util.reader.exception.IncompleteOperationException;

public class InstitutionController extends MainController<Institution> {
    @Autowired
    public void setInstitutionService(MainService<Institution> institutionService) {
        super.mainService = institutionService;
    }

    /**  /add institution */
    @Override
    public Institution add() {
        try {
            if (useActiveT()) return currT;
            else currT = new Institution();
            currT.setNo(ReaderFactory.INTEGER_READER.read("Введите номер..."));
            onlySetAddress();
            mainService.add(currT);
        } catch (IncompleteOperationException ignore) { /*save*/ }
        return currT;
    }

    /** /institution set address */
    public Institution setAddress() throws IncompleteOperationException {
        if (!useActiveT()) return add();
        return onlySetAddress();
    }

    private Institution onlySetAddress() throws IncompleteOperationException {
        System.out.println("Введите айди адреса...");
        currT.setAddress(ControllerFactory.getAddressController().getFromList());
        return currT;
    }

}
