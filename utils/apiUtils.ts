import { ContactInfo } from '../components/interfaces';

const getContactInfo = async (id: string) => {

  const res = await fetch('/api/contacts/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(id),
  });

  const result: ContactInfo = await res.json();

  if (result) {
    return result;
  } else {
    return null;
  }
};

export default getContactInfo;
