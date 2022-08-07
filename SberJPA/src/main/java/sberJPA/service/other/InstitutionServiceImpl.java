package sberJPA.service.other;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sberJPA.dao.MainDao;
import sberJPA.model.other.Institution;
import sberJPA.service.MainService;

import java.util.List;

@Service
public class InstitutionServiceImpl implements MainService<Institution> {
    private MainDao<Institution> institutionDao;

    public void setInstitutionDao(MainDao<Institution> institutionDao) {
        this.institutionDao = institutionDao;
    }

    @Override
    @Transactional
    public Institution add(Institution institution) {
        return institutionDao.add(institution);
    }

    @Override
    @Transactional
    public void update(Institution institution) {
        institutionDao.update(institution);
    }

    @Override
    @Transactional
    public void remove(Long id) {
        institutionDao.remove(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Institution getById(Long id) {
        return institutionDao.getById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Institution> getAll() {
        return institutionDao.getAll();
    }
}
