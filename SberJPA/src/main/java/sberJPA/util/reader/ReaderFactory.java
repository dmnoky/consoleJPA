package sberJPA.util.reader;

import sberJPA.util.reader.exception.IncompleteOperationException;

public final class ReaderFactory {
    public static final Reader<Boolean> BOOLEAN_READER = new BooleanReader();
    public static final Reader<String> STRING_READER = new StringReader();
    public static final Reader<Long> LONG_READER = new LongReader();
    public static final Reader<Integer> INTEGER_READER = new IntegerReader();
    public static final Reader<Boolean> READER = new BooleanReader() {
        @Override
        public Boolean read(String consoleOut) throws IncompleteOperationException {
            if (consoleOut.length()>0) System.out.println(consoleOut);
            return ReaderAbs.checkSystemMessage(ReaderAbs.lastInput);
        }
    };
}
