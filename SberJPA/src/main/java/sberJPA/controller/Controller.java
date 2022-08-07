package sberJPA.controller;

import sberJPA.util.reader.exception.IncompleteOperationException;

import java.util.List;

public interface Controller<T> {
    T add();
    T set(T t);
    T get() throws IncompleteOperationException;
    void needClearing() throws IncompleteOperationException;
    T getFromList() throws IncompleteOperationException;
    List<T> getAll();
    void save() throws IncompleteOperationException;

}
