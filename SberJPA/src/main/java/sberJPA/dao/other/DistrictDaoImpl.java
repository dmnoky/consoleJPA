package sberJPA.dao.other;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;
import sberJPA.dao.MainDao;
import sberJPA.model.other.District;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.util.List;

import static javax.swing.UIManager.get;

@Repository
public class DistrictDaoImpl implements MainDao<District> {
    private static final Logger logger = LoggerFactory.getLogger(DistrictDaoImpl.class);
    @PersistenceContext
    private EntityManager entityManager;

    public void setEntityManager(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public District add(District district) {
        District res = entityManager.merge(district);
        logger.info("district: "+district+" successfully added.");
        return res;
    }

    @Override
    public void update(District district) {
        entityManager.merge(district);
        logger.info("district: "+district+" successfully updated.");
    }

    @Override
    public void remove(Long id) {
        District res = (District) get(id);
        entityManager.remove(res);
        logger.info("district: "+res+" successfully removed.");
    }

    @Override
    public District getById(Long id) {
        return entityManager.find(District.class, id);
    }

    @Override
    public List<District> getAll() {
        TypedQuery<District> namedQuery = entityManager.createNamedQuery("District.getAll", District.class);
        return namedQuery.getResultList();
    }
}
