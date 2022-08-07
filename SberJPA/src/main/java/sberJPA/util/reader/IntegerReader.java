package sberJPA.util.reader;

import sberJPA.util.reader.exception.IncompleteOperationException;

public class IntegerReader extends ReaderAbs<Integer> {
    IntegerReader() {}

    @Override
    public Integer read(String consoleOut) throws IncompleteOperationException {
        while (ReaderAbs.inputIsNotSystem(consoleOut)) {
            if (lastInput.matches("^\\d+$")) return Integer.parseInt(lastInput);
            System.out.println("Введите число...");
        }
        throw new IncompleteOperationException();
    }
}