import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { getContactById } from "../store/actions/contactActions";
import { spendBalance } from "../store/actions/userActions";

import { TransferFund } from "../components/TransferFund";
import { MoveList } from "../components/MoveList";

import arrowLeft from "../assets/images/icons/arrow-left.png";

export function ContactDetailsPage(props) {
  const { loggedInUser } = useSelector((state) => state.userModule);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [contact, setContact] = useState();
  const [showTransCmp, setShowTransCmp] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    loadContact();
  }, [id]);

  const loadContact = async () => {
    const contactForState = await dispatch(getContactById(id));
    setContact(contactForState);
  };

  const onBack = () => {
    navigate('/contact')
    // props.history.push("/contact");
  };

  const onTransferCoins = (amount) => {
    dispatch(spendBalance(contact, amount));
    loadContact();
  };

  if (!loggedInUser || !contact) return <div>Loading...</div>;
  return contact ? (
    <main className="details-cmp add-margin">
      <div className="details-cmp__btns">
        <img src={arrowLeft} alt="" title="Back" onClick={onBack} className="back" />
        <Link to={`/contact/edit/${contact._id}`}>
          <i className="fa-solid fa-pen-to-square edit" title="Edit"></i>
        </Link>
      </div>
      <section className="contact-det1">
        <img src={`https://robohash.org/set_set5/${contact._id}.png`} alt="" className="contact-det1__img" />
        <section className="details">{contact.name}</section>
      </section>
      <div className="contact-det2">
        <div className="row">
          <i className="fa-solid fa-envelope icon"></i>
          <span>{contact.email}</span>
        </div>
        <div className="row">
          <i className="fa-solid fa-phone icon"></i>
          <span>{contact.phone}</span>
        </div>
      </div>

      {showTransCmp ? (
        <TransferFund contact={contact} maxCoins={loggedInUser.coins} onTransferCoins={onTransferCoins} />
      ) : (
        <button className="add-trans" onClick={() => setShowTransCmp(true)}>
          Add Transaction
        </button>
      )}
      <MoveList movesList={loggedInUser.moves.filter((m) => m.toId === contact._id)} title="My Moves" />
    </main>
  ) : (
    <div>Loading...</div>
  );
}
