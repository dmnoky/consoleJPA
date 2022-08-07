package sberJPA.dao.other;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;
import sberJPA.dao.MainDao;
import sberJPA.model.other.Institution;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.util.List;

import static javax.swing.UIManager.get;

@Repository
public class InstitutionDaoImpl implements MainDao<Institution> {
    private static final Logger logger = LoggerFactory.getLogger(InstitutionDaoImpl.class);
    @PersistenceContext
    private EntityManager entityManager;

    public void setEntityManager(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public Institution add(Institution instruction) {
        Institution res = entityManager.merge(instruction);
        logger.info("instruction: "+instruction+" successfully added.");
        return res;
    }

    @Override
    public void update(Institution instruction) {
        entityManager.merge(instruction);
        logger.info("instruction: "+instruction+" successfully updated.");
    }

    @Override
    public void remove(Long id) {
        Institution res = (Institution) get(id);
        entityManager.remove(res);
        logger.info("instruction: "+res+" successfully removed.");
    }

    @Override
    public Institution getById(Long id) {
        return entityManager.find(Institution.class, id);
    }

    @Override
    public List<Institution> getAll() {
        TypedQuery<Institution> namedQuery = entityManager.createNamedQuery("Institution.getAll", Institution.class);
        return namedQuery.getResultList();
    }
}
