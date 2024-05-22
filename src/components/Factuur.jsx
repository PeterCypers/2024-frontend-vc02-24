import { Button } from "@mui/material";
import easyinvoice from "easyinvoice";
import React from "react";

class Factuur extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      invoiceBase64: "",
    };
  }

  async downloadInvoice() {
    const data = this.getSampleData(this.props.bestelling);
    const result = await easyinvoice.createInvoice(data);
    easyinvoice.download(
      `factuur${this.props.bestelling.ORDERID}.pdf`,
      result.pdf
    );
  }

  render() {
    return (
      <div>
        <Button variant="contained" onClick={() => this.downloadInvoice()}>
          Download factuur
        </Button>
      </div>
    );
  }

  getSampleData(bestelling) {
    const products = bestelling.producten.map((product) => ({
      quantity: product.PRODUCT_AANTAL,
      description: product.PRODUCT_NAAM,
      price: product.PRODUCT_EENHEIDSPRIJS,
    }));

    return {
      images: {
        logo: bestelling.leverancier.LEVERANCIER_BEDRIJF_LOGO,
      },
      sender: {
        company: bestelling.leverancier.LEVERANCIER_BEDRIJF_NAAM,
        address: `${bestelling.leverancier.LEVERANCIER_BEDRIJF_STRAATNR} ${bestelling.leverancier.LEVERANCIER_BEDRIJF_STRAAT}`,
        zip: bestelling.leverancier.LEVERANCIER_BEDRIJF_POSTCODE,
        city: bestelling.leverancier.LEVERANCIER_BEDRIJF_STAD,
        country: bestelling.leverancier.LEVERANCIER_BEDRIJF_LAND,
      },
      client: {
        company: bestelling.klant.KLANT_BEDRIJF_NAAM,
        address: `${bestelling.klant.STRAATNR} ${bestelling.klant.STRAAT}`,
        zip: bestelling.klant.POSTCODE,
        city: bestelling.klant.STAD,
        country: bestelling.klant.LAND,
      },
      information: {
        number: bestelling.ORDERID,
        date: bestelling.DATUMGEPLAATST,
        "due-date": bestelling.BETALINGSDATUM,
      },
      products: products,
      settings: {
        currency: "EUR",
        locale: "nl-NL",
      },
      translate: {
        invoice: "FACTUUR",
        number: "Nummer",
        date: "Datum",
        "due-date": "Verloopdatum",
        subtotal: "Subtotaal",
        products: "Producten",
        quantity: "Aantal",
        price: "Prijs",
        "product-total": "Totaal",
        total: "Totaal",
        vat: "btw",
      },
    };
  }
}

export default Factuur;
