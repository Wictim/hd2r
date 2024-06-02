document.addEventListener('DOMContentLoaded', () => {
    const rulesContainer = document.getElementById('rules-container');

    const rules = [
    {
      "title": "Orbital stratagems",
      "rules": {
        "Oa": "All",
        "O1": "No railcannon",
        "O2": "No laser",
        "O3": "No barrage",
        "Ol": "No lethal",
        "On": "None"
      }
    },
    {
      "title": "Eagle stratagems",
      "rules": {
        "Ea": "All",
        "E1": "No 500kg",
        "E2": "No airstrike",
        "El": "No lethal",
        "En": "None"
      }
    },
    {
      "title": "Turret stratagems",
      "rules": {
        "Ta": "All",
        "T1": "No mortar (EMS mortar allowed)",
        "T2": "No autocannon",
        "T3": "No rocket",
        "Tl": "No lethal",
        "Tn": "None"
      }
    },
    {
      "title": "Exosuit stratagems",
      "rules": {
        "Xa": "All",
        "Xn": "None"
      }
    },
    {
      "title": "Support equipment stratagems (heavy armor penetration)",
      "rules": {
        "SHa": "All",
        "SH1": "No quasar",
        "SH2": "No arc thrower",
        "SH3": "No flamethrower",
        "SH4": "No expendable",
        "SH5": "No recoilless",
        "SH6": "No spear",
        "SHn": "None"
      }
    },
    {
      "title": "Support equipment stratagems (medium and light armor penetration)",
      "rules": {
        "SMa": "All",
        "SM1": "No autocannon",
        "SM2": "No anti-material rifle",
        "SM3": "No grenade launcher",
        "SM4": "No laser cannon",
        "SM5": "No airburst RL",
        "SMn": "None"
      }
    },
    {
      "title": "Support equipment stratagems (backpack)",
      "rules": {
        "SBa": "All",
        "SB1": "No personal shield",
        "SB2": "No guard dog",
        "SBl": "No lethal",
        "SBn": "None"
      }
    },
    {
      "title": "Equipment - weapons (primary and secondary)",
      "rules": {
        "Qa": "All",
	"Qr": "No Assault rifles",
	"Qd": "No Marksman rifles",
	"Qg": "No SMGs",
	"Qs": "No shotguns",
        "Qe": "No energy-based",
        "Qx": "No explosive",
	"Qm": "No medium armor penetration",
	"Qi": "No infinite ammo weapons"
      }
    },
    {
      "title": "Equipment - grenades",
      "rules": {
        "Ga": "All",
        "Gs": "Standard grenades only",
        "Gl": "No lethal"
      }
    },
    {
      "title": "Equipment - armor",
      "rules": {
        "Aa": "All",
        "Al": "No light armor",
        "Am": "No medium",
        "Ah": "No heavy armor",
        "Aa": "No increased capacity",
        "Aa": "No damage prevention (higher armor rating allowed)",
        "Aa": "No detection reduction"
      }
    },
    {
      "title": "Extra",
      "rules": {
        "NB": "No boosters",
        "NS": "No supply stratagem",
        "NR": "No reinforcements (wipe = mission fail)",
        "NH": "No hellbomb",
        "NA": "No SEAF artillery",
        "TK": "Teamkill = Death (end yourself in the shortest time possible - no other actions allowed)"
      }
    }
  ];
  
    const urlParams = new URLSearchParams(window.location.search);
	const ruleString = urlParams.get("r") || "";
	const codes = ruleString.split(",");
	
    rules
	.forEach(section => {
		const sectionCodes = Object.keys(section.rules);
		const defaultCode = sectionCodes.find(code => code.endsWith("a"))
		let usedCodes = sectionCodes.filter(code => codes.includes(code));
		if (usedCodes.length === 0) {
			if(defaultCode) {
				usedCodes = [defaultCode];
			} else {
				return;
			}
		} else {
			
			const codesToAdd = []
			usedCodes.forEach(code => {
				const match = /^(\w+)(\d+)$/.exec(code);
				if(match) {
					const prefix = match[1];
					const index = Number(match[2]);
					for(let i = index - 1; i > 0; i--){
						usedCodes.push(prefix + i);
					}
				}
			})
			usedCodes = [...new Set(usedCodes)];
		}

	  const sectionElement = createSectionDiv();
	  const sectionTitle = createSectionTitle(section.title);
	  sectionElement.appendChild(sectionTitle);

	  usedCodes.forEach(code => {
		sectionElement.appendChild(createRule(section.rules[code]));
	  });

	  rulesContainer.appendChild(sectionElement);
	});

});

function createSectionDiv() {
	const sectionElement = document.createElement('div');
	sectionElement.classList.add('section');
	return sectionElement;
}

function createSectionTitle(title) {
	  const sectionTitle = document.createElement('h3');
	  sectionTitle.textContent = title;
	return sectionTitle;
}

function createRule(description){
	const ruleElement = document.createElement('div');
	ruleElement.classList.add('rule');
	ruleElement.textContent = description;
	return ruleElement;
}
