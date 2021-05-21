const users = [
  {
    group: "ven-led-int-secured",
    title: "Venezuelan-Led and Internationally Secured",
    desc:
      "Venezuelans should play the leading role in resolving their own crisis, while international actors must have strong support roles that are clearly defined from the beginning.",
  },
  {
    group: "wider-representation",
    title: "A Process That Involves Women as Leaders and Partners",
    desc:
      "Venezuelan women are disproportionally affected by the crisis but have not been adequately involved in past negotiations. This should be rectified as peace negotiation outcomes improve when women are actively involved.",
  },
  {
    group: "representation",
    title: "Authentic Representation of Venezuelan Society",
    desc:
      "The negotiation process should represent a more complete spectrum of Venezuelan citizens, including civil society, smaller political parties, Indigenous groups, trade unions, and Venezuelan migrants, among others.",
  },
  {
    group: "comb-int-pressure",
    title: "United Opposition with a Fresh Narrative",
    desc:
      "Before arriving at the negotiating table, Venezuelan opposition leaders should be united and collaborate with each other and any other pertinent players to develop a clear strategy that reframes negotiation as a sign of strength.",
  },
  {
    group: "timing-conditions",
    title: "Timing and Conditions",
    desc:
      "The regime needs to be under targeted internal and external pressure to be brought to the negotiating table in earnest. ",
  },
  {
    group: "structure-process",
    title: "Stronger Structure and Process",
    desc:
      "Venezuela needs a well-planned and professional negotiation structure with well-trained facilitators. The parties should be encouraged to jointly identify issues that merit being discussed in separate tables.",
  }
];

users.forEach((user) => {
  tippy("." + user.group, {
    content:
      "<h3>" +
      user.title +
      "</h3></div><p>" +
      user.desc +
      "</p>",
    allowHTML: true,
    arrow: "false",
    interactive: "true",
    placement: "auto",
    trigger: "click",
  });
});
