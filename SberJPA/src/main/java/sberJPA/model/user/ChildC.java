package sberJPA.model.user;

import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import sberJPA.model.other.Institution;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="child_c")
@NamedQuery(name = "ChildC.getAll", query = "SELECT a from ChildC a")
@PrimaryKeyJoinColumn(name="id")
public class ChildC extends User {
    @LazyCollection(LazyCollectionOption.FALSE)
    @ManyToMany(
            cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.DETACH, CascadeType.REFRESH})
    @JoinTable(
            name="parent_child_c",
            inverseJoinColumns=@JoinColumn(name="id_parent_a", referencedColumnName="id", nullable = false),
            joinColumns=@JoinColumn(name="id_child_c", referencedColumnName="id", nullable = false))
    private List<ParentC> parents = new ArrayList<>();

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "institution_id")
    private Institution institution;

    @Column(name = "age")
    private Integer age;

    public List<ParentC> getParents() {
        return parents;
    }

    public void setParents(List<ParentC> parents) {
        this.parents = parents;
    }

    public void addParent(ParentC parent) {
        if (!parents.contains(parent))
            this.parents.add(parent);
    }

    public Institution getInstitution() {
        return institution;
    }

    public void setInstitution(Institution institution) {
        this.institution = institution;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    @Override
    public String toString() {
        final StringBuilder sb = new StringBuilder("ChildC{");
        sb.append(super.toString());
        sb.append(", institution=").append(institution);
        sb.append(", age=").append(age);
        sb.append('}');
        return sb.toString();
    }

}
