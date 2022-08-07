package sberJPA.util.reader;

import sberJPA.util.reader.exception.IncompleteOperationException;

public class BooleanReader extends ReaderAbs<Boolean> {
    BooleanReader() {}

    @Override
    public Boolean read(String consoleOut) throws IncompleteOperationException {
        while (ReaderAbs.inputIsNotSystem(consoleOut)) {
            if (lastInput.equals("Y")) return true;
            if (lastInput.equals("N")) return false;
            else System.out.println("Введите 'Y' или 'N' (без ковычек)...");
        }
        throw new IncompleteOperationException();
    }
}
