package sberJPA.service;

import java.util.List;

public interface MainService<T> {
    T add(T t);
    void update(T t);
    void remove(Long id);
    T getById(Long id);
    List<T> getAll();
}
