package sberJPA.service.other;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sberJPA.dao.MainDao;
import sberJPA.model.other.District;
import sberJPA.service.MainService;

import java.util.List;

@Service
public class DistrictServiceImpl implements MainService<District> {
    private MainDao<District> districtDao;

    public void setDistrictDao(MainDao<District> districtDao) {
        this.districtDao = districtDao;
    }

    @Override
    @Transactional
    public District add(District district) {
        return districtDao.add(district);
    }

    @Override
    @Transactional
    public void update(District district) {
        districtDao.update(district);
    }

    @Override
    @Transactional
    public void remove(Long id) {
        districtDao.remove(id);
    }

    @Override
    @Transactional(readOnly = true)
    public District getById(Long id) {
        return districtDao.getById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<District> getAll() {
        return districtDao.getAll();
    }
}
