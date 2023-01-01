import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { removeContact, saveContact, getContactById } from "../store/actions/contactActions";

import arrowLeft from "../assets/images/icons/arrow-left.png";
import trashIcon from "../assets/images/icons/trash.png";

export function ContactEditPage(props) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [contact, setContact] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    loadContact();
  }, [id]);

  const loadContact = async () => {
    const contactForState = id
      ? await dispatch(getContactById(id))
      : {
          name: "",
          email: "",
          phone: "",
        };
    setContact(contactForState);
  };

  const handleChange = async ({ target }) => {
    const field = target.name;
    const value = target.type === "number" ? +target.value || "" : target.value;
    setContact((prevState) => ({ ...prevState.contact, [field]: value }));
  };

  const onSave = async (ev) => {
    ev.preventDefault();
    dispatch(saveContact(contact));
    onBack();
  };

  const onRemove = async () => {
    dispatch(removeContact(contact._id));
    onBack(false);
  };

  const onBack = (toContacts = true) => {
    contact._id && toContacts ? navigate(`/contact/${contact._id}`) : navigate(`/contact`);
  };

  if (!contact) return <div>Loading...</div>;
  return (
    <main className="edit-cmp add-margin">
      <div className="edit-cmp__btns">
        <img src={arrowLeft} alt="" title="Back" onClick={onBack} className="back" />
        {contact._id && <img src={trashIcon} alt="" title="Remove" className="trash" onClick={onRemove} />}
      </div>
      <section className="contact-det">
        <img src={`https://robohash.org/set_set5/${contact._id}.png`} alt="" className="contact-det__img" />
        <form className="edit" onSubmit={onSave}>
          <span className="edit__row">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" onChange={handleChange} name="name" value={contact.name} placeholder="Name" />
          </span>

          <span className="edit__row">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" onChange={handleChange} name="email" value={contact.email} placeholder="Email" />
          </span>

          <span className="edit__row">
            <label htmlFor="phone">Phone:</label>
            <input type="tel" id="phone" onChange={handleChange} name="phone" value={contact.phone} placeholder="Phone" />
          </span>

          <button className="edit__save">Save</button>
        </form>
      </section>
    </main>
  );
}
