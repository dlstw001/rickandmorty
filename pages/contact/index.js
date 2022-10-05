import ContactBar from "../../components/contact/ContactBar";
import http from "../../helper/http";

export default function Contact(props) {
  return (
    <>
      <div>
        <ContactBar init={props.init} />
      </div>
    </>
  );
}

export async function getStaticProps() {
  const res = await http.get("/character");
  const init = res.results;
  return {
    props: { init }, // will be passed to the page component as props
  };
}
