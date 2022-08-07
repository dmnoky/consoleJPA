package sberJPA.controller;

import sberJPA.model.MainModel;
import sberJPA.service.MainService;
import sberJPA.util.reader.ReaderFactory;
import sberJPA.util.reader.exception.IncompleteOperationException;

import java.util.List;

abstract class MainController<T extends MainModel> implements Controller<T> {
    protected MainService<T> mainService;
    protected T currT;
    protected List<T> list;

    @Override
    public abstract T add();

    @Override
    public T set(T t) {
        currT = t;
        return currT;
    }

    @Override
    public T get() throws IncompleteOperationException {
        if (currT == null) {
            if (ReaderFactory.BOOLEAN_READER.read("Текущий елемент не создан. Создать?")) add();
            else if (ReaderFactory.BOOLEAN_READER.read("Или выбрать из текущего списка?")) getFromList();
        }
        return currT;
    }

    @Override
    public void needClearing() throws IncompleteOperationException {
        if (currT == null) System.out.println("Нет активного елемента");
        else if (ReaderFactory.BOOLEAN_READER.read("Стереть данные активного елемента?")) {
            currT = null;
            System.out.println("Данные елемента удалены.");
        }
    }

    @Override
    public T getFromList() throws IncompleteOperationException {
        list = getAll();
        try {
            long id = ReaderFactory.LONG_READER.read("Введите id:");
            currT = list.stream().filter(t -> t.getId() == id).findFirst().get();
        } catch (java.util.NoSuchElementException e) {
            System.out.println("Елемент не найден!");
            getFromList();
        }
        return currT;
    }

    @Override
    public List<T> getAll() {
        list = mainService.getAll();
        System.out.println("Текущий список:");
        for (T t : list) {
            System.out.println(t);
        }
        return list;
    }

    @Override
    public void save() throws IncompleteOperationException {
        if (get() != null) mainService.add(currT);
    }

    protected boolean useActiveT() throws IncompleteOperationException {
        if (currT != null) {
            return ReaderFactory.BOOLEAN_READER.read("Есть активный елемент: \n" + currT + "\n Использовать его?");
        }
        return false;
    }
}
