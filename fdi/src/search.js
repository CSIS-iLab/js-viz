var countriesArray = ["Seychelles", "Sudan", "Zambia", "Kenya", "South Sudan", "Tanzania", "Zimbabwe", "Comoros", "Rwanda", "Uganda", "Mozambique", "Ethiopia", "Eritrea", "Madagascar", "Burundi", "Malawi", "Reunion", "Djibouti", "Somalia", "Equatorial Guinea", "Gabon", "Angola", "Congo", "Sao Tome and Principe", "Cameroon", "Chad", "Democratic Republic of the Congo", "Central African Republic", "Libya", "Algeria", "Tunisia", "Morocco", "Egypt", "Western Sahara", "Botswana", "South Africa", "Namibia", "Swaziland", "Lesotho", "Cape Verde", "Nigeria", "Ghana", "Cote dIvoire (IvoryCoast)", "Mauritania", "Senegal", "Benin", "Burkina Faso", "Sierra Leone", "Mali", "Togo", "Guinea-Bissau", "Guinea", "Gambia, The", "Niger", "Liberia", "Saint Helena", "Panama", "Costa Rica", "Mexico", "Belize", "El Salvador", "Guatemala", "Honduras", "Nicaragua", "Bermuda", "United States of America", "Canada", "Bahamas, The", "Trinidad and Tobago", "Puerto Rico", "Saint Kitts and Nevis", "Barbados", "Antigua and Barbuda", "Grenada", "Saint Lucia", "Dominica", "Saint Vincent and the Grenadines", "Dominican Republic", "Cuba", "Jamaica", "Haiti", "Guadeloupe", "Martinique", "Montserrat", "Saint Pierre and Miquelon", "Virgin Islands, British", "Virgin Islands, U.S.", "Aruba", "Cayman Islands", "Greenland", "Turks and Caicos Islands", "Uruguay", "Chile", "Argentina", "Venezuela", "Brazil", "Suriname", "Colombia", "Peru", "Ecuador", "Paraguay", "Guyana", "Bolivia", "Falkland Islands (Islas Malvinas)", "French Guiana", "Kazakhstan", "Turkmenistan", "Uzbekistan", "Kyrgyzstan", "Tajikistan", "Macao", "Japan", "Hong Kong", "South Korea", "Taiwan", "China", "Mongolia", "North Korea", "Singapore", "Brunei", "Malaysia", "Thailand", "Indonesia", "Philippines", "Timor-Leste", "Vietnam", "Laos", "Myanmar", "Cambodia", "Iran", "Maldives", "Sri Lanka", "Bhutan", "India", "Pakistan", "Bangladesh", "Nepal", "Afghanistan", "Qatar", "Kuwait", "United Arab Emirates", "Israel", "Cyprus", "Saudi Arabia", "Bahrain", "Oman", "Turkey", "Lebanon", "Azerbaijan", "Iraq", "Jordan", "Armenia", "Georgia", "Syria", "Yemen", "State of Palestine", "Czech Republic", "Slovakia", "Poland", "Hungary", "Russian Federation", "Romania", "Bulgaria", "Belarus", "Ukraine", "Moldova", "Norway", "Sweden", "Denmark", "Finland", "Iceland", "Ireland", "United Kingdom", "Estonia", "Lithuania", "Latvia", "Faroe Islands", "Italy", "Spain", "Slovenia", "Greece", "Portugal", "Malta", "Croatia", "Montenegro", "Serbia", "Macedonia", "Bosnia and Herzegovina", "Albania", "Gibraltar", "Switzerland", "Luxembourg", "Netherlands", "Austria", "Germany", "Belgium", "France", "New Zealand", "Fiji", "Vanuatu", "Papua New Guinea", "Solomon Islands", "New Caledonia", "Kiribati", "Nauru", "Guam", "Tonga", "Samoa", "Cook Islands", "Niue", "American Samoa", "French Polynesia"];

// constructs the suggestion engine
var countries = new Bloodhound({
  datumTokenizer: Bloodhound.tokenizers.whitespace,
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  local: countriesArray
});

$('#searchContainer .typeahead').typeahead({
  hint: true,
  highlight: true,
  minLength: 1
},
{
  name: 'countries',
  source: countries
});

$('.typeahead').bind('typeahead:select typeahead:autocomplete', function(ev, suggestion) {
  var searchID = suggestion.replace(/\s+/g, '');

  if($("#" + searchID).length) {
    $('#'+searchID).trigger('mouseover');
    console.log('Selection: ' + suggestion);
    $('#'+searchID).triggerSVGEvent('mouseover').triggerSVGEvent('mousemove');
  }
  else {
    $('#noData').html("There is no data available for "+suggestion+" at this time.");
  }
});

$('.typeahead').bind('typeahead:change', function(ev, suggestion) {
  $('#noData').empty();
  $('#gates_tooltip').css('opacity','0');
});