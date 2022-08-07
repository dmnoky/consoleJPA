package sberJPA.model.other;

import sberJPA.model.MainModel;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name="institution")
@NamedQuery(name = "Institution.getAll", query = "SELECT a from Institution a")
@PrimaryKeyJoinColumn(name="id")
public class Institution implements MainModel {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name="id_address")
    private Address address;

    @Column(name = "no")
    private Integer no;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public Integer getNo() {
        return no;
    }

    public void setNo(Integer no) {
        this.no = no;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Institution)) return false;
        Institution institution = (Institution) o;
        return id.equals(institution.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        final StringBuilder sb = new StringBuilder("Institution{");
        sb.append("id=").append(id);
        if (address != null)
            sb.append(", address=").append(address.getId())
                .append(address.getAddress()).append(address.getCity());
        sb.append(", no=").append(no);
        sb.append('}');
        return sb.toString();
    }
}
