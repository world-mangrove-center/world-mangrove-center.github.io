CREATE TABLE "map_categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"key" varchar(80) NOT NULL,
	"name_en" varchar(160) NOT NULL,
	"name_id" varchar(160) NOT NULL,
	"color" varchar(9) DEFAULT '#68ef3f' NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"visible_by_default" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "map_categories_key_unique" UNIQUE("key")
);
--> statement-breakpoint
CREATE TABLE "map_features" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar(160) NOT NULL,
	"category_id" integer,
	"name_en" varchar(200) NOT NULL,
	"name_id" varchar(200) NOT NULL,
	"description_en" text DEFAULT '' NOT NULL,
	"description_id" text DEFAULT '' NOT NULL,
	"geometry" jsonb NOT NULL,
	"area_ha" double precision,
	"year" integer,
	"image_url" text,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"published" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "map_features_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
ALTER TABLE "map_features" ADD CONSTRAINT "map_features_category_id_map_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."map_categories"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "map_features_category_idx" ON "map_features" USING btree ("category_id");