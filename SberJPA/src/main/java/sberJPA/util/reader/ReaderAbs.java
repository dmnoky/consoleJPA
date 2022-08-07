package sberJPA.util.reader;

import sberJPA.Main;
import sberJPA.controller.ControllerFactory;
import sberJPA.util.reader.exception.IncompleteOperationException;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

abstract class ReaderAbs<T> implements Reader<T> {
    private static final BufferedReader BUFFERED_READER = new BufferedReader(new InputStreamReader(System.in));
    protected static String lastOutput = "", lastInput = "";

    public abstract T read(String consoleOut) throws IncompleteOperationException;

    protected static boolean inputIsNotSystem(String consoleOut) throws IncompleteOperationException {
        System.out.println(consoleOut);
        lastOutput = consoleOut;
        try {
            String lastInput = BUFFERED_READER.readLine();
            while (lastInput.length() == 0) {
                System.out.println(lastOutput);
            }
            ReaderAbs.lastInput = lastInput;
            return checkSystemMessage(lastInput);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return false;
    }

    /** todo:: Хранить все строки в пропах */
    static boolean checkSystemMessage(String message) throws IncompleteOperationException {
        switch (message) {
            case "/exit":
                Main.running = false;
                return false;
            case "/help":
                System.out.println("/add [parent | child | address | district | institution]\n" +
                        "/save [parent | child | address | district | institution]\n" +
                        "/parent [set address | add child]\n" +
                        "/child [set institution | add parent]\n" +
                        "/address set district\n" +
                        "/district add addresses\n" +
                        "/institution set address\n" +
                        "/exit");
                return inputIsNotSystem(lastOutput);
            case "/add parent":
                ControllerFactory.getParentController().add();
                return false;
            case "/add child":
                ControllerFactory.getChildController().add();
                return false;
            case "/add address":
                ControllerFactory.getAddressController().add();
                return false;
            case "/add district":
                ControllerFactory.getDistrictController().add();
                return false;
            case "/add institution":
                ControllerFactory.getInstitutionController().add();
                return false;
            case "/save parent":
                ControllerFactory.getParentController().save();
                return false;
            case "/save child":
                ControllerFactory.getChildController().save();
                return false;
            case "/save address":
                ControllerFactory.getAddressController().save();
                return false;
            case "/save district":
                ControllerFactory.getDistrictController().save();
                return false;
            case "/save institution":
                ControllerFactory.getInstitutionController().save();
                return false;
            case "/parent set address":
                ControllerFactory.getParentController().setAddress();
                return false;
            case "/child set institution":
                ControllerFactory.getChildController().setInstitution();
                return false;
            case "/address set district":
                ControllerFactory.getAddressController().setDistrict();
                return false;
            case "/district add addresses":
                ControllerFactory.getDistrictController().addAddress();
                return false;
            case "/institution set address":
                ControllerFactory.getInstitutionController().setAddress();
                return false;
            case "/parent add child":
                ControllerFactory.getParentController().addChild();
                return false;
            case "/child add parent":
                ControllerFactory.getChildController().addParent();
                return false;
        }
        return true;
    }
}
