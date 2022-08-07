package sberJPA.controller;

import org.springframework.beans.factory.annotation.Autowired;
import sberJPA.model.other.Address;
import sberJPA.service.MainService;
import sberJPA.util.reader.ReaderFactory;
import sberJPA.util.reader.exception.IncompleteOperationException;

public class AddressController extends MainController<Address> {
    @Autowired
    public void setAddressService(MainService<Address> addressService) {
        super.mainService = addressService;
    }

    /**  /add address */
    @Override
    public Address add() {
        try {
            if (useActiveT()) return currT;
            else currT = new Address();
            currT.setCity(ReaderFactory.STRING_READER.read("Введите город..."));
            currT.setPostalCode(ReaderFactory.STRING_READER.read("Введите индекс..."));
            currT.setAddress(ReaderFactory.STRING_READER.read("Введите адрес..."));
            onlySetDistrict();
            mainService.add(currT);
        } catch (IncompleteOperationException ignore) { /*save*/ }
        return currT;
    }

    /** /address set district */
    public Address setDistrict() throws IncompleteOperationException {
        if (!useActiveT()) return add();
        return onlySetDistrict();
    }

    private Address onlySetDistrict() throws IncompleteOperationException {
        System.out.println("Введите айди района...");
        currT.setDistrict(ControllerFactory.getDistrictController().getFromList());
        return currT;
    }

}
