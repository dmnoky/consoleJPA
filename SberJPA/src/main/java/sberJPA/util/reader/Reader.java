package sberJPA.util.reader;

import sberJPA.util.reader.exception.IncompleteOperationException;

public interface Reader <T> {
    T read(String consoleOut) throws IncompleteOperationException;
}
