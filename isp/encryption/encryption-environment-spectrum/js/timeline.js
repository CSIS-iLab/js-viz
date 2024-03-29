Highcharts.setOptions({
  chart: {
    style: {
      fontFamily: "Roboto, sans-serif",
    },
  },
});
$(function () {
  $(`#hcContainer`).highcharts({
    // General Chart Options
    chart: {
      type: "timeline",
      height: "350px",
      backgroundColor: "#FFF",
    },
    exporting: { enabled: true },
    // Chart Title and Subtitle
    title: {
      text: "User Experiences in Encryption Policy Environments",
      style: {
        fontFamily: "Roboto, sans-serif",
      },
    },
    subtitle: {
      text:
        "Hover over a segment of the spectrum to learn more about user experiences.",
      style: {
        fontFamily: "Roboto, sans-serif",
      },
    },
    // Accessibility
    accessibility: {
      screenReaderSection: {
        beforeChartFormat:
          "<h5>{chartTitle}</h5>" +
          "<div>{typeDescription}</div>" +
          "<div>{chartSubtitle}</div>" +
          "<div>{chartLongdesc}</div>" +
          "<div>{viewTableButton}</div>",
      },
      point: {
        valueDescriptionFormat: "{index}. {point.label}. {point.description}.",
      },
    },
    // Colors
    colors: ["#111420", "#1E2A3D", "#27425B", "#2C5D7A", "#2C7998"],
    // Hardcoded data
    series: [
      {
        style: {
          fontFamily: "Roboto, sans-serif",
        },
        data: [
          {
            name: "Design Mandates",
            description:
              "<img src='icons/at_risk.png' width='25' height='25' /> <b style='color:#004165'>At-Risk Groups: </b>Egypt's LGBT community remains at-risk for persecution and targeting. Egyptian law restricts access to encryption by requiring government approval for companies and platform seeking to encrypt their products. With many digital platforms not secured, those in the LGBT community in Egypt eliminate or reduce their digital footprint as a result.<br /><br /><img src='icons/businesses.png' width='25' height='25' /> <b style='color:#004165'>Businesses and Organizations: </b>Communications regulations in India require that any encryption provider using greater than 40-bit encryption reach an agreement with the government and disclose encryption keys before operating. Given that 40-bit encryption is largely obsolete, services such as WhatsApp openly use 256-bit encryption keys and unrecoverable encryption. While WhatsApp has not yet been banned or forced to turn over its keys, it faces increasing pressure from the Indian government for failing to turn over data in response to law enforcement requests. ",
          },
          {
            name: "Technology-neutral Access Mandates",
            description:
              "<img src='icons/foreign_policy.png' width='25' height='25' /> <b style='color:#004165'>Foreign Policy: </b>U.S. soldiers from the 82nd Airborne Division deployed to Iraq in 2020 were instructed to use Signal and Wickr on U.S. government cell phones due to concerns over privacy and security of communications from Iranian eavesdropping and possible influence over Iraqi network providers, telecoms, and intelligence services.<br /><br /><img src='icons/businesses.png' width='25' height='25' /> <b style='color:#004165'>Businesses and Organizations: </b>Since 2018, the United Kingdom and Australia have passed laws that arguably give their governments the authority to demand that companies maintain the capability to facilitate access to encrypted data. In 2020, United States lawmakers proposed legislation requiring companies to provide technical mechanisms to gain access to information protected via unrecoverable encryption.",
          },
          {
            name: "User Decryption Mandates",
            description:
              "<img src='icons/terrorists.png' width='25' height='25' /> <b style='color:#004165'>Terrorists, Extremists, and Hate Groups: </b>Members of the Islamic State in France have used encrypted messenger apps with auto-delete and self-destruct feature to prevent French law enforcement from obtaining communications and attack planning data even if members are compelled to provide biometric keys for device access.<br /><br /><img src='icons/independant_voices.png' width='25' height='25' /> <b style='color:#004165'>Independent Voices: </b>Journalists increasingly turn to device encryption on both computers and smart phones to protect their information, sources, and reporting. However, journalists at U.S. border crossings may be pressured to open their devices for warrantless searches during secondary screenings.",
          },
          {
            name: "Workarounds to Access Encrypted Data",
            description:
              "<img src='icons/terrorists.png' width='25' height='25' /> <b style='color:#004165'>Terrorists, Extremists, and Hate Groups: </b>In 2017 news outlets reported that German police with lawful hacking authorities were able to hack into Telegram accounts of right-wing extremists, accessing their encrypted communication and logging new messages in real time.<br /><br /><img src='icons/at_risk.png' width='25' height='25' /> <b style='color:#004165'>At-Risk Groups: </b>Toronto-based Citizen Lab cites numerous countries with histories of targeting at-risk groups and civil society have been found to use technology that provides a workaround to device and message encryption. When users click on a link that installs spyware on their mobile device, the spyware operator now has access to the trove of personal data and information on the user's phone.",
          },
          {
            name: "No Access to Encrypted Communications",
            description:
              "<img src='icons/foreign_policy.png' width='25' height='25' /> <b style='color:#004165'>Foreign Policy: </b>Russian diplomats and intelligence officers operating in the United States use commercially available encryption platforms to mask communications from U.S. law enforcement unable to obtain the data from providers and technology firms.<br /><br /><img src='icons/independant_voices.png' width='25' height='25' /> <b style='color:#004165'>Independent Voices: </b>Following the public disclosure of U.S. government documents by Edward Snowden in 2013, many in the independent voices community became aware of the need to encrypt data and communications in the face of modern surveillance techniques. Shortly thereafter, secure messaging applications incorporated end-to-end encryption by default.",
          },
        ],
      },
    ],
    // Credits
    credits: {
      enabled: true,
      // position: {
      //   y: 5
      // },
      href: false,
      text:
        "<p style='margin-top:500px'>CSIS International Security Program | See Sources & Credits section below.</p>",
      style: {
        fontFamily: "Roboto, sans-serif",
      },
    },
    // Chart Legend
    legend: {
      title: {
        text: "",
      },
      align: "center",
      verticalAlign: "bottom",
      layout: "horizontal",
    },
    // X and Y Axis
    xAxis: {
      visible: false,
    },
    yAxis: {
      visible: false,
    },
    // Tooltip
    tooltip: {
      useHTML: true,
      backgroundColor: "#FFF",
      headerFormat: "",
      style: {
        width: 300,
      },
    },
    // Additional Plot Options
    plotOptions: {
      series: {
        marker: {
          height: 35,
        },
      },
    },
  });
});
