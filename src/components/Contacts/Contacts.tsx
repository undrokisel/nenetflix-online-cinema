import { MapContacts } from "components/MapContacts";
import { H3 } from "ui";
import { Container, ContactsList } from "./styles";

export const Contacts = () => {
  return (
    <Container>
      <ContactsList>
        <H3>Адрес: г. Пермь, ул. Пушкина, д. 113</H3>
        <H3>Email: cinema@ya.com</H3>
        <H3>tel: 8-912-98-98-555</H3>
      </ContactsList>
      <MapContacts />;
    </Container>
  );
};
