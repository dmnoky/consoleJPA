package sberJPA.dao;

import sberJPA.model.other.Address;

import java.util.List;

public interface MainDao<T> {
    T add(T t);
    void update(T t);
    void remove(Long id);
    T getById(Long id);
    List<T> getAll();
}
