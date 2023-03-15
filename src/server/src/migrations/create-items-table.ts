import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateItemsTable1677149813989 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE items (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description VARCHAR(255),
        price integer NOT NULL,
        category VARCHAR(255) NOT NULL,
        image VARCHAR(255) NOT NULL
      )
    `);

    await queryRunner.query(`
    INSERT INTO items (title, description, price, category, image) VALUES
    ('ULTRABOOST LIGHT RUNNING SHOES', 'Experience epic energy with the new Ultraboost Light, our lightest Ultraboost ever.', 14300, 'Running', 'https://nevsky.storage.yandexcloud.net/hacktory/1.webp'),
    ('ADIDAS BY STELLA MCCARTNEY COURT SLIP ON SHOES', 'Casual and versatile, these adidas by Stella McCartney shoes transition with you through every part of your day.', 13600, 'by Stella McCartney', 'https://nevsky.storage.yandexcloud.net/hacktory/2.webp'),
    ('ADIDAS 4DFWD RUNNING SHOES', 'These running shoes are built to keep you moving forward, whether you''re new to running or have finished so many races you''ve lost count.', 15100, 'Running', 'https://nevsky.storage.yandexcloud.net/hacktory/3.webp'),
    ('DAILY 3.0 SHOES', 'A fresh take on a classic, these adidas shoes blend a heritage feel with modern materials and design.', 4900, 'Essentials', 'https://nevsky.storage.yandexcloud.net/hacktory/4.webp'),
    ('KAPTIR 2.0 SHOES', 'Running can be as much about comfort as it is about style.', 6800, 'Essentials', 'https://nevsky.storage.yandexcloud.net/hacktory/5.webp'),
    ('FORUM EXHIBIT LOW SHOES', 'The versatility of the adidas Forum Exhibit Low Shoes is demonstrated by the eclectic range of inspirations.', 8320, 'Originals', 'https://nevsky.storage.yandexcloud.net/hacktory/6.webp'),
    ('ULTRABOOST 1.0 SHOES', 'From a walk in the park to a weekend run with friends, these adidas Ultraboost 1.0 shoes are designed to keep you comfortable.', 15100, 'Sportswear', 'https://nevsky.storage.yandexcloud.net/hacktory/7.webp'),
    ('TERREX AGRAVIC FLOW 2 TRAIL RUNNING SHOES', 'This trail running shoe will elevate your mountain game to the next level with advanced technology built-in like solid rock protection and lightweight cushioning.', 6300, 'TERREX', 'https://nevsky.storage.yandexcloud.net/hacktory/8.webp'),
    ('HOOPS 3.0 MID CLASSIC VINTAGE SHOES', 'Pick up your dry cleaning or chill in the park with your pals. Dress in track pants or chinos.', 4200, 'Essentials', 'https://nevsky.storage.yandexcloud.net/hacktory/9.webp'),
    ('NIZZA RF SLIP SHOES', 'When worlds collide, magic happens. These adidas shoes are proof. They take vintage B-ball DNA and mix it with a classic design from the world of skate. Voila.', 3100, 'Originals', 'https://nevsky.storage.yandexcloud.net/hacktory/10.webp'),
    ('ADIDAS GRAND COURT X LEGO 2.0 SHOES', 'For fans of LEGO toys who prefer the little blocks on, rather than under, their feet — and who doesn''t?', 6000, 'Essentials', 'https://nevsky.storage.yandexcloud.net/hacktory/11.webp'),
    ('ULTRABOOST 22 RUNNING SHOES', 'Even on your busiest days, running is a priority. These adidas trainers make every mile count, thanks to the incredible energy return of BOOST cushioning.', 7100, 'Running', 'https://nevsky.storage.yandexcloud.net/hacktory/12.webp'),
    ('GAZELLE SHOES', 'A low-profile classic. The Gazelle shoe started life as a soccer shoe and grew into an iconic streetwear staple.', 7500, 'Originals', 'https://nevsky.storage.yandexcloud.net/hacktory/13.webp'),
    ('HARDEN VOLUME 7 BASKETBALL SHOES', 'From his lethal stepback to his love of luxury fashion, there''s no doubt that James Harden has style. With his signature shoes from adidas Basketball, it all comes into play.', 12100, 'Basketball', 'https://nevsky.storage.yandexcloud.net/hacktory/14.webp'),
    ('CRAZY 1 SHOES', 'These shoes from adidas Basketball pair a retro design with modern features so you can show out every time you step on the hardwood.', 11300, 'Originals', 'https://nevsky.storage.yandexcloud.net/hacktory/15.webp'),
    ('NMD_R1 SHOES', 'Whether it''s behind the wheel, up in the air or out on the streets, these adidas NMD_R1 shoes will get you wherever you need to be.', 12100, 'Originals', 'https://nevsky.storage.yandexcloud.net/hacktory/16.webp'),
    ('SAMBA CLASSIC', 'Getting up and down the field with speed is the name of the indoor game.', 5600, 'Soccer', 'https://nevsky.storage.yandexcloud.net/hacktory/17.webp'),
    ('TERREX FREE HIKER 2 GORE-TEX HIKING SHOE', 'TERREX Free Hiker 2 GORE-TEX brings comfort and confidence to your everyday adventure. It''s time to enjoy your outdoor experience.', 13900, 'TERREX', 'https://nevsky.storage.yandexcloud.net/hacktory/18.webp'),
    ('ZNSORED SHOES', 'A chunky outsole brings these classic skater-style sneakers up to the minute.', 6000, 'Sportswear', 'https://nevsky.storage.yandexcloud.net/hacktory/19.webp'),
    ('FORUM LOW SHOES', 'More than just a shoe, it''s a statement. ', 7500, 'Originals', 'https://nevsky.storage.yandexcloud.net/hacktory/20.webp'),
    ('GAZELLE SHOES', 'These sneakers are a one-to-one reissue of the 1991 Gazelle, with the same materials, proportions and textures as the original.', 7500, 'Originals', 'https://nevsky.storage.yandexcloud.net/hacktory/21.webp'),
    ('NIZZA RF SHOES', 'A versatile low-cut shape shows off a rubber toe cap and 3-Stripes. A clean-lined sole keeps the look fresh.', 4800, 'Originals', 'https://nevsky.storage.yandexcloud.net/hacktory/22.webp'),
    ('CENTENNIAL 85 HI SHOES', 'The Centennial 85 Hi Shoes celebrate archival hardwood DNA through an homage to one of our basketball icons.', 6300, 'Running', 'https://nevsky.storage.yandexcloud.net/hacktory/23.jpg'),
    ('MAHOMES 1 IMPACT FLX SHOES', 'Elevate your game to MVP level. Before Patrick Mahomes takes the field, he puts the work in the weight room. ', 10500, 'Running', 'https://nevsky.storage.yandexcloud.net/hacktory/24.webp')
  `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE items');
  }
}
