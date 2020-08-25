$(function () {
  $(`#hcContainer`).highcharts({
    // General Chart Options
    chart: {
      zoomType: "x",
      type: "timeline",
      height: "300px",
    },
    exporting: { enabled: true },
    // Chart Title and Subtitle
    title: {
      text: "The Encryption Policy Environment Spectrum",
    },
    subtitle: {
      text:
        "Call-out boxes show the segments of the policy environment spectrum. Hover to see examples of actors and states that fall within that segment.",
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
    colors: ["#3B4A68", "#3E5A8E", "#406AB2", "#427CDD", "#4185F3"],
    // Hardcoded data
    series: [
      {
        data: [
          {
            name: "Design Mandates",
            label: "China, Russia, India",
            description:
              "Design mandates are laws and regulations that require companies to build their products and services in specific ways to facilitate access to data. Some impose strict design mandates on companies outlining how their products and services should be built, including the use of specific types of encryption. Some seek to limit the strength of encryption available to users. Design mandates, often operationalized through certification, licensing, or testing regimes, can be built to ensure that only accessible encryption systems would be allowed in a country.",
          },
          {
            name: "Technology-neutral Access Mandates",
            label: "United Kingdom, Australia, France",
            description:
              "Technology-neutral mandates refrain from specifying how technology providers must build their systems but instead require companies to provide decrypted data when asked by the government. While technology companies are left with the flexibility to decide how access is accomplished, the end effect is the same as in the case of design mandates: only providers who are willing and able to provide decrypted data to the government can operate legally in the country. Some countries have passed laws that could allow them to mandate recoverability but have yet to enact them, and the exact scope of those authorities remains unclear.",
          },
          {
            name: "User Decryption Mandates",
            label: "France, Australia",
            description:
              "Some countries have addressed the challenge of encryption by requiring users to facilitate access to communications. Instead of compelling companies to facilitate access to their customers’ data, users may be compelled to disclose their private encryption keys, including passwords and biometric keys such as fingerprints or face scans. User mandates avoid imposing constraints on companies that provide encrypted products and services but do result in companies informing users that their data is being collected.",
          },
          {
            name: "Workarounds to Access Encrypted Communications",
            label: "Germany, United Kingdom, Sweden",
            description:
              "Government use of workaroundSome governments use workarounds to access encrypted systems rather than restrict access to encryption. These workarounds range from lawful hacking and “man-in-the-middle” attacks to “ghost key” proposal, in which companies would surreptitiously add users to chats without notifying the other chatters. Some countries develop in-house capabilities to do lawful hacking and codebreaking operations. Others turn to vendors to buy hacking products and services, fueling a “gray market” of cyber companies whose activities tend to be in legal and ethical gray areas.s to access encrypted systems rather than restricting access to encryption.",
          },
          {
            name: "No Access to Encrypted Communications",
            label: "The United States",
            description:
              "Some countries have no authorities in place to access encrypted communications. Countries may choose not to pursue authorities to access encrypted communications or may be unable to legislate accordingly. For advocates of encryption, this allows companies to maintain their privacy compact with users. For law enforcement, this environment poses the greatest challenge: agencies must rely primarily on unencrypted data sources and other methods of evidence gathering. Some countries may have the resources to support isolated attempts at technical workarounds, for most, certain types of data and communications will be effectively off-limits. ",
          },
        ],
      },
    ],
    // Credits
    credits: {
      enabled: true,
      href: false,
      text: "CSIS",
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
      headerFormat: "",
      style: {
        width: 350,
    }
    },
    // Additional Plot Options
    plotOptions: {
      // timeline: {
      //   stacking: null,
      //   borderColor: "transparent",
      //   groupPadding: 0.1,
      //   pointPadding: 0.05,
      //   // pointWidth: 33,
      //   dataLabels: {
      //     enabled: false
      //   }
      // }
    },
  });
});
