package sberJPA.controller;

import org.springframework.beans.factory.annotation.Autowired;
import sberJPA.model.other.District;
import sberJPA.service.MainService;
import sberJPA.util.reader.ReaderFactory;
import sberJPA.util.reader.exception.IncompleteOperationException;

public class DistrictController extends MainController<District> {
    @Autowired
    public void setDistrictService(MainService<District> districtService) {
        super.mainService = districtService;
    }

    /**  /add district */
    @Override
    public District add() {
        try {
            if (useActiveT()) return currT;
            else currT = new District();
            currT.setName(ReaderFactory.STRING_READER.read("Введите имя..."));
            onlyAddAddress();
            mainService.add(currT);
        } catch (IncompleteOperationException ignore) { /*save*/ }
        return currT;
    }

    /** /district add addresses */
    public District addAddress() throws IncompleteOperationException {
        if (!useActiveT()) return add();
        return onlyAddAddress();
    }

    private District onlyAddAddress() throws IncompleteOperationException {
        while (ReaderFactory.BOOLEAN_READER.read("Добавить адрес?")) {
            currT.addAddress(ControllerFactory.getAddressController().getFromList());
        }
        return currT;
    }

}
