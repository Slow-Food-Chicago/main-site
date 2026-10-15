export interface Supplier {
  name: string
  rating: string
  why: string
  url: string
}

export interface SwapItem {
  item: string
  blurb: string
  suppliers: Supplier[]
}

export const swapItems: SwapItem[] = [
  {
    item: 'Flour',
    blurb:
      'All flours are not created equal. Stone-milling whole heirloom wheats like Turkey Red preserves the germ, bran, and rich aroma while supporting regional regenerative grain agriculture.',
    suppliers: [
      {
        name: "Janie's Mill (Ashkum, IL)",
        rating: 'A',
        why: 'Fifth-generation family farm growing certified organic heirloom wheats, ancient grains, and milling them fresh to order on granite millstones.',
        url: 'https://www.janiesmill.com',
      },
      {
        name: 'Brian Severson Farms',
        rating: 'A',
        why: 'Stone-milled heritage grains like Purple Straw wheat and open-pollinated varieties grown using organic soil-building practices.',
        url: 'https://quality-organic-2.myshopify.com/',
      },
      {
        name: 'Meadowlark Organics',
        rating: 'A',
        why: 'Offers a variety of organic grains and beans.',
        url: 'https://meadowlarkorganics.com',
      },
    ],
  },
  {
    item: 'Vegetable Oil & Cooking Fats',
    blurb:
      'Sunflowers are endemic to the Americas, and Helianthus annuus is prized for delicate seed oil. Choosing regional cold-pressed seed oils or pasture-raised culinary fats avoids industrial chemical solvents.',
    suppliers: [
      {
        name: 'Smude Sunflower Oil',
        rating: 'A',
        why: 'Produces premium cold-pressed, non-GMO high-oleic sunflower oil that retains natural vitamin E and gentle flavor.',
        url: 'https://smudeoil.com',
      },
      {
        name: 'South Chicago Packing (Chicago, IL)',
        rating: 'B',
        why: 'Historic Chicago supplier promoting nose-to-tail utilization by rendering responsibly sourced materials into traditional cooking lard and tallow.',
        url: 'https://southchicagopacking.com',
      },
    ],
  },
  {
    item: 'Dried Beans & Legumes',
    blurb:
      'Heirloom dry beans possess creamy textures and complex earthy notes that generic canned beans cannot match. In regional crop rotations, their roots naturally fix nitrogen to rebuild fertile soil.',
    suppliers: [
      {
        name: 'Three Sisters Garden (Kankakee, IL)',
        rating: 'A',
        why: 'Celebrated boutique farm growing open-pollinated heirloom beans and native crops using traditional companion planting methods.',
        url: 'https://www.threesistersgardenkankakee.com',
      },
      {
        name: 'Meadowlark Organics (Ridgeway, WI)',
        rating: 'A',
        why: "Certified organic black turtle, pinto, and Jacob's Cattle beans grown as vital rotational crops that nourish the regional grain shed.",
        url: 'https://meadowlarkorganics.com',
      },
    ],
  },
  {
    item: 'Cornmeal & Grits',
    blurb:
      'Stone-ground heritage corn preserves natural oils and sweet, roasted aromas that modern high-heat industrial degermination strips away, yielding unparalleled polenta and cornbread.',
    suppliers: [
      {
        name: 'Hazzard Free Farm (Pecatonica, IL)',
        rating: 'A',
        why: 'Woman-owned farm growing, saving seeds, and stone-milling rare heritage grains including Bloody Butcher and Floriani Red flint corn.',
        url: 'https://hazzardfreefarm.com',
      },
      {
        name: "Janie's Mill (Ashkum, IL)",
        rating: 'A',
        why: 'Certified organic whole-kernel yellow and flint polenta ground slowly with cool stones to preserve flavor and nutrition.',
        url: 'https://www.janiesmill.com',
      },
    ],
  },
  {
    item: 'Raw Honey',
    blurb:
      "Unheated, chemical-free honey captures the distinct botanical terroir of Chicago's urban flora—from basswood trees to wild prairie asters—while supporting crucial native pollinators.",
    suppliers: [
      {
        name: 'Chicago Honey Co-op (Chicago, IL)',
        rating: 'A',
        why: "Worker-owned cooperative maintaining pesticide-free urban apiaries across Chicago's South and West sides, producing 100% raw, unheated honey.",
        url: 'https://chicagohoneycoop.com',
      },
      {
        name: 'Bike a Bee (Chicago, IL)',
        rating: 'A',
        why: 'Community-embedded apiary placing hives in urban farms and school gardens across Chicago, serviced entirely by bicycle.',
        url: 'https://bikeabee.com',
      },
    ],
  },
  {
    item: 'Preserves & Ferments',
    blurb:
      'Small-batch preservation honors the seasonal rhythm of the Midwest harvest, locking in the brightness of regional orchard fruits and fermented crops without artificial thickeners.',
    suppliers: [
      {
        name: "Bushel & Peck's (Beloit, WI)",
        rating: 'A',
        why: 'Certified organic family farm handcrafting small-batch ferments, raw apple cider vinegars, and fruit jams for Chicago farmers markets.',
        url: 'https://bushelandpecks.com',
      },
      {
        name: 'Rare Bird Preserves (Oak Park, IL)',
        rating: 'A',
        why: 'Artisan fruit preserves handcrafted in traditional French copper kettles using sustainably grown fruit from Midwest family orchards.',
        url: 'https://www.instagram.com/rarebirdpreserves/',
      },
      {
        name: 'Co-op Sauce (Chicago, IL)',
        rating: 'B',
        why: 'Small-batch fermented hot sauces and vinegars made in Chicago with local farm ingredients, supporting youth arts non-profits.',
        url: 'https://coopsauce.com',
      },
    ],
  },
  {
    item: 'Maple Syrup & Regional Sweeteners',
    blurb:
      'Pure tree syrups reflect the biodiversity of undisturbed northern forests. Cold late-winter thaws boiled down over wood-fired evaporators produce unblended syrups rich in zinc, manganese, and terroir that industrial corn-syrups can never rival.',
    suppliers: [
      {
        name: 'Funks Grove Pure Maple Sirup (Shirley, IL)',
        rating: 'A',
        why: "Illinois historic landmark producing single-origin pure maple 'sirup' since 1891 from a permanently conserved virgin maple-beech timber grove.",
        url: 'https://funkspuremaplesirup.com',
      },
      {
        name: 'Tapped Maple Syrup (Stevens Point, WI)',
        rating: 'A',
        why: 'Craft-tapped from sustainably managed northern Wisconsin hardwood family forests, producing single-forest and craft-infused regional pure syrups.',
        url: 'https://tappedmaplesyrup.com',
      },
    ],
  },
  {
    item: 'Rolled Oats & Whole Grains',
    blurb:
      'Hull-less heirloom oats, farro, and spelt deliver hearty nuttiness and soluble fiber while serving as crucial rotational crops that break pest cycles and enrich soil biology between grain plantings.',
    suppliers: [
      {
        name: "Janie's Mill (Ashkum, IL)",
        rating: 'A',
        why: 'Thick-rolled certified organic heirloom oats and whole ancient grains like emmer, farro, and spelt grown in regenerative east-central Illinois soil.',
        url: 'https://www.janiesmill.com',
      },
      {
        name: 'Meadowlark Organics (Ridgeway, WI)',
        rating: 'A',
        why: 'Certified organic naked oats and whole rye berries grown with continuous cover-cropping to preserve topsoil across the Driftless Area.',
        url: 'https://meadowlarkorganics.com',
      },
    ],
  },
  {
    item: 'Vinegars & Acid',
    blurb:
      'Live-culture vinegars brewed slowly through natural acetification impart bright depth and gut-healthy probiotics, in contrast to white distilled vinegars made from petroleum-derived industrial acetic acid.',
    suppliers: [
      {
        name: 'Seedling Orchard (South Haven, MI)',
        rating: 'A',
        why: 'Small-batch raw apple cider vinegar pressed from hand-harvested heirloom cider apples along the Lake Michigan fruit ridge.',
        url: 'https://www.instagram.com/seedlingfruit/',
      },
      {
        name: "Bushel & Peck's (Beloit, WI)",
        rating: 'A',
        why: "Unfiltered, unpasteurized cider vinegars aged in oak barrels with native 'mother' cultures using whole regional windfall apples.",
        url: 'https://bushelandpecks.com',
      },
    ],
  },
  {
    item: 'Culinary Herbs & Dried Spices',
    blurb:
      'Freshly dried regional herbs and direct-relationship single-origin spices retain volatile essential oils and pungent aromas that degrade during the multi-year commodity supply chains common in supermarkets.',
    suppliers: [
      {
        name: 'Star Farm Chicago (Chicago, IL)',
        rating: 'A',
        why: 'Urban farm in Back of the Yards harvesting, dehydrating, and hand-blending pesticide-free culinary herbs while creating local job opportunities.',
        url: 'https://www.starfarmchicago.org',
      },
      {
        name: 'The Spice House (Chicago & Evanston, IL)',
        rating: 'A',
        why: 'Midwest spice institution hand-sourcing small-batch whole spices, freshly grinding seeds and hand-mixing signature herb blends every week.',
        url: 'https://www.thespicehouse.com',
      },
    ],
  },
  {
    item: 'Mustards & Savory Condiments',
    blurb:
      'Stone-milling whole mustard seeds preserves their natural enzyme activity and fiery pop, turning a simple pantry jar into a showcase of Midwestern brassica cultivation.',
    suppliers: [
      {
        name: 'Co-op Sauce (Chicago, IL)',
        rating: 'A',
        why: 'Chicago-made stone-ground mustards and fermented condiments crafted with local craft beer, regional cider vinegar, and Midwest mustard seed.',
        url: 'https://coopsauce.com',
      },
      {
        name: 'Mustard Girl (Mineral Point, WI)',
        rating: 'A',
        why: 'Wisconsin artisan using clean Midwestern ingredients, whole seeds, and apple cider vinegar without added starches or chemical stabilizers.',
        url: 'https://mustardgirl.com',
      },
    ],
  },
  {
    item: 'Farmstead Cheese & Cultured Dairy',
    blurb:
      'Pasture-raised milk captures the seasonal botany of Midwest pastures. Small-batch artisan cheese making and slow culturing yield complex flavor and preserve heritage livestock breeds.',
    suppliers: [
      {
        name: 'J2K Capraio (Walkerton, IN)',
        rating: 'A',
        why: 'Family-operated creamery on a 22-acre pasture-based goat farm (and home of Slow Food Chicago board member Jody Klinedinst!) crafting raw and aged artisanal cheeses.',
        url: 'https://www.j2kcapraio.com',
      },
      {
        name: 'Nordic Creamery (Westby, WI)',
        rating: 'A',
        why: 'Fourth-generation Wisconsin family creamery crafting small-batch cultured butter and raw milk cheeses from cows grazing natural clover and prairie grasses.',
        url: 'https://nordiccreamery.com',
      },
    ],
  },
]
