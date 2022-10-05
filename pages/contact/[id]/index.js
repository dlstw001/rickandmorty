import ContactDetails from "../../../components/contact/details/ContactDetails";

export default function Details(props) {
  return (
    <div>
      <ContactDetails info={props.id} />
    </div>
  );
}
