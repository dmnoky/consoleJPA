package sberJPA.model.user;

import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import sberJPA.model.other.Address;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Entity
@Table(name="parent_c")
@NamedQuery(name = "ParentC.getAll", query = "SELECT a from ParentC a")
@PrimaryKeyJoinColumn(name="id")
public class ParentC extends User {
    @OneToOne
    @JoinColumn(name="id_address")
    private Address address;

    @LazyCollection(LazyCollectionOption.FALSE)
    @ManyToMany(
            cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.DETACH, CascadeType.REFRESH})
    @JoinTable(
            name="parent_child_c",
            inverseJoinColumns=@JoinColumn(name="id_child_c", referencedColumnName="id", nullable = false),
            joinColumns=@JoinColumn(name="id_parent_a", referencedColumnName="id", nullable = false))
    private List<ChildC> child = new ArrayList<>();

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public List<ChildC> getChild() {
        return child;
    }

    public void setChild(List<ChildC> child) {
        this.child = child;
    }

    public void addChild(ChildC child) {
        if (!this.child.contains(child))
            this.child.add(child);
    }

    @Override
    public String toString() {
        final StringBuilder sb = new StringBuilder("ParentC{");
        sb.append(super.toString());
        sb.append("address=").append(address);
        sb.append(child);
        sb.append('}');
        return sb.toString();
    }
}
