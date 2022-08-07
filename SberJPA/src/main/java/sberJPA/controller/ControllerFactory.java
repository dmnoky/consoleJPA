package sberJPA.controller;

import org.springframework.beans.factory.annotation.Autowired;

public class ControllerFactory {
    private static ChildController childController;
    private static ParentController parentController;
    private static AddressController addressController;
    private static DistrictController districtController;
    private static InstitutionController institutionController;

    public void setParentController(ParentController parentController) {
        ControllerFactory.parentController = parentController;
    }
    public void setChildController(ChildController childController) {
        ControllerFactory.childController = childController;
    }
    public void setAddressController(AddressController addressController) {
        ControllerFactory.addressController = addressController;
    }
    public static void setDistrictController(DistrictController districtController) {
        ControllerFactory.districtController = districtController;
    }
    public static void setInstitutionController(InstitutionController institutionController) {
        ControllerFactory.institutionController = institutionController;
    }

    public static ChildController getChildController() {
        return childController;
    }

    public static ParentController getParentController() {
        return parentController;
    }

    public static AddressController getAddressController() {
        return addressController;
    }

    public static DistrictController getDistrictController() {
        return districtController;
    }

    public static InstitutionController getInstitutionController() {
        return institutionController;
    }

}
