package sberJPA.dao.other;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;
import sberJPA.dao.MainDao;
import sberJPA.model.other.Address;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.util.List;

import static javax.swing.UIManager.get;

@Repository
public class AddressDaoImpl implements MainDao<Address> {
    private static final Logger logger = LoggerFactory.getLogger(AddressDaoImpl.class);
    @PersistenceContext
    private EntityManager entityManager;

    public void setEntityManager(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public Address add(Address address) {
        Address res = entityManager.merge(address);
        logger.info("address: "+address+" successfully added.");
        return res;
    }

    @Override
    public void update(Address address) {
        entityManager.merge(address);
        logger.info("address: "+address+" successfully updated.");
    }

    @Override
    public void remove(Long id) {
        Address res = (Address) get(id);
        entityManager.remove(res);
        logger.info("address: "+res+" successfully removed.");
    }

    @Override
    public Address getById(Long id) {
        return entityManager.find(Address.class, id);
    }

    @Override
    public List<Address> getAll() {
        TypedQuery<Address> namedQuery = entityManager.createNamedQuery("Address.getAll", Address.class);
        return namedQuery.getResultList();
    }
}
