package sberJPA.service.other;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sberJPA.dao.MainDao;
import sberJPA.model.other.Address;
import sberJPA.service.MainService;

import java.util.List;

@Service
public class AddressServiceImpl implements MainService<Address> {
    private MainDao<Address> addressDao;

    public void setAddressDao(MainDao<Address> addressDao) {
        this.addressDao = addressDao;
    }

    @Override
    @Transactional
    public Address add(Address address) {
        return addressDao.add(address);
    }

    @Override
    @Transactional
    public void update(Address address) {
        addressDao.update(address);
    }

    @Override
    @Transactional
    public void remove(Long id) {
        addressDao.remove(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Address getById(Long id) {
        return addressDao.getById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Address> getAll() {
        return addressDao.getAll();
    }
}
