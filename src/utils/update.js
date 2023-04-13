import axios from "axios";

async function update({ endPoint, options, id }) {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/${endPoint}/${id}`,
      options
    );
  } catch {}
}

export { update };
