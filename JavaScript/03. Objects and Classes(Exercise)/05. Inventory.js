function heroInventory(input) {
    let heroes = [];
    for (const line of input) {
        let [hero, level, items] = line.split(' / ');
        level = Number(level);
        heroes.push({ hero, level, items });
    };
    let sortedHeroes = heroes.sort((heroA, heroB) => heroA.level - heroB.level);
    for (const hero of sortedHeroes) {
        console.log(`Hero: ${hero.hero}\nlevel => ${hero.level}\nitems => ${hero.items}`);
    };
}

heroInventory([
    'Isacc / 25 / Apple, GravityGun',
    'Derek / 12 / BarrelVest, DestructionSword',
    'Hes / 1 / Desolator, Sentinel, Antara'
])