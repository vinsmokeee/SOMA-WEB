/* Free sample mock test — visible to everyone. Original questions (not copied from RCSC papers). */
window.DP_FREE = {
  id: "free",
  title: "Free Mock Test",
  minutes: 25,
  data: {
    title: "Sales of a fruit cooperative, in Nu. thousand (fictional data)",
    head: ["Year", "Apples", "Oranges"],
    rows: [["2021", 120, 200], ["2022", 150, 190], ["2023", 135, 230], ["2024", 180, 240], ["2025", 210, 260]]
  },
  questions: [
    { s: "English", q: "Choose the correctly spelt word.", o: ["Acommodation", "Accommodation", "Accomodation", "Acomodation"], a: 1, e: "Accommodation has a double 'c' and a double 'm'." },
    { s: "English", q: "Choose the word closest in meaning to METICULOUS.", o: ["Careless", "Thorough", "Quick", "Noisy"], a: 1, e: "Meticulous means showing great attention to detail: thorough." },
    { s: "English", q: "Fill in the blank: Neither the manager nor his assistants ___ present at the meeting.", o: ["is", "were", "was being", "has been"], a: 1, e: "With 'neither… nor', the verb agrees with the nearer subject. 'Assistants' is plural, so 'were'." },
    { s: "English", q: "Choose the word opposite in meaning to SCARCE.", o: ["Rare", "Abundant", "Limited", "Meagre"], a: 1, e: "Scarce means in short supply; abundant means plentiful." },
    { s: "English", q: "Find the part with an error: He has been working here (A) / since five years (B) / in the same office (C) / No error (D).", o: ["A", "B", "C", "D"], a: 1, e: "Use 'for' with a length of time: 'for five years'. 'Since' is used with a point in time." },

    { s: "Logical reasoning", q: "Find the next number: 3, 7, 15, 31, 63, ?", o: ["95", "126", "127", "129"], a: 2, e: "Each term is double the previous plus 1: 63 × 2 + 1 = 127." },
    { s: "Logical reasoning", q: "If TEA is written as UFB, how is CUP written in that code?", o: ["DVQ", "BTO", "DUQ", "EVR"], a: 0, e: "Each letter moves one step forward: C→D, U→V, P→Q." },
    { s: "Logical reasoning", q: "Statements: All teachers are graduates. Some graduates are farmers. Conclusions: I. Some teachers are farmers. II. Some farmers are graduates.", o: ["Only I follows", "Only II follows", "Both follow", "Neither follows"], a: 1, e: "II follows directly from 'some graduates are farmers'. I does not follow: the farmers may not be among the teachers." },
    { s: "Logical reasoning", q: "Pema is taller than Karma. Karma is taller than Dorji. Sonam is shorter than Dorji. Who is the shortest?", o: ["Pema", "Karma", "Dorji", "Sonam"], a: 3, e: "Order: Pema > Karma > Dorji > Sonam." },
    { s: "Logical reasoning", q: "Which is the odd one out?", o: ["Paro", "Punakha", "Kathmandu", "Trashigang"], a: 2, e: "Paro, Punakha and Trashigang are dzongkhags of Bhutan; Kathmandu is in Nepal." },

    { s: "Data interpretation", q: "Using the table: what were total apple sales from 2021 to 2025?", o: ["Nu. 765,000", "Nu. 795,000", "Nu. 810,000", "Nu. 845,000"], a: 1, e: "120 + 150 + 135 + 180 + 210 = 795 thousand." },
    { s: "Data interpretation", q: "Using the table: by what percentage did apple sales rise from 2024 to 2025?", o: ["15.0%", "16.7%", "18.5%", "30.0%"], a: 1, e: "(210 − 180) ÷ 180 × 100 ≈ 16.7%." },
    { s: "Data interpretation", q: "Using the table: in which year was the gap between orange and apple sales the smallest?", o: ["2021", "2022", "2024", "2025"], a: 1, e: "Gaps: 80, 40, 95, 60, 50. The smallest is 40, in 2022." },
    { s: "Data interpretation", q: "Using the table: what were average yearly orange sales?", o: ["Nu. 214,000", "Nu. 220,000", "Nu. 224,000", "Nu. 230,000"], a: 2, e: "(200 + 190 + 230 + 240 + 260) ÷ 5 = 1,120 ÷ 5 = 224 thousand." },
    { s: "Data interpretation", q: "Using the table: what was the ratio of apple to orange sales in 2024?", o: ["2 : 3", "3 : 4", "4 : 5", "3 : 5"], a: 1, e: "180 : 240 = 3 : 4 (divide both by 60)." },

    { s: "General awareness", q: "What is the national animal of Bhutan?", o: ["Snow leopard", "Takin", "Red panda", "Golden langur"], a: 1, e: "The takin is Bhutan's national animal." },
    { s: "General awareness", q: "In which year was the Constitution of the Kingdom of Bhutan adopted?", o: ["2005", "2006", "2008", "2011"], a: 2, e: "The Constitution was adopted on 18 July 2008." },
    { s: "General awareness", q: "Who first articulated the idea of Gross National Happiness?", o: ["The First Druk Gyalpo", "The Third Druk Gyalpo", "The Fourth Druk Gyalpo", "The Fifth Druk Gyalpo"], a: 2, e: "His Majesty the Fourth Druk Gyalpo, Jigme Singye Wangchuck, is credited with the concept of GNH." },
    { s: "General awareness", q: "On which date is Bhutan's National Day celebrated?", o: ["21 February", "2 June", "11 November", "17 December"], a: 3, e: "National Day is 17 December, marking the coronation of the First King in 1907." },
    { s: "General awareness", q: "The Ngultrum is pegged at par with which currency?", o: ["US Dollar", "Nepalese Rupee", "Indian Rupee", "Chinese Yuan"], a: 2, e: "The Ngultrum is pegged one-to-one with the Indian Rupee." }
  ]
};
