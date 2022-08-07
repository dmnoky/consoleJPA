package sberJPA.util.reader;

import sberJPA.util.reader.exception.IncompleteOperationException;

public class LongReader extends ReaderAbs<Long> {
    LongReader() {}

    @Override
    public Long read(String consoleOut) throws IncompleteOperationException {
        while (ReaderAbs.inputIsNotSystem(consoleOut)) {
            if (lastInput.matches("^\\d+$")) return Long.parseLong(lastInput);
            System.out.println("Введите число...");
        }
        throw new IncompleteOperationException();
    }
}
