CREATE TYPE "public"."message_status" AS ENUM('new', 'read', 'replied', 'archived');--> statement-breakpoint
CREATE TYPE "public"."metric_group" AS ENUM('impact', 'partners');--> statement-breakpoint
CREATE TYPE "public"."publication_type" AS ENUM('paper', 'report', 'data');--> statement-breakpoint
CREATE TYPE "public"."request_status" AS ENUM('pending', 'approved', 'rejected');--> statement-breakpoint
CREATE TYPE "public"."team_category" AS ENUM('researcher', 'localAdvisor', 'management', 'ecologyExpert');--> statement-breakpoint
CREATE TABLE "admin_users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(200) NOT NULL,
	"name" varchar(160) NOT NULL,
	"password_hash" text NOT NULL,
	"last_login_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "admin_users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "contact_messages" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(160) NOT NULL,
	"email" varchar(200) NOT NULL,
	"organization" varchar(200),
	"topic" varchar(40) DEFAULT 'general' NOT NULL,
	"message" text NOT NULL,
	"locale" varchar(5) DEFAULT 'en' NOT NULL,
	"status" "message_status" DEFAULT 'new' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "data_requests" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(160) NOT NULL,
	"email" varchar(200) NOT NULL,
	"institution" varchar(200) NOT NULL,
	"purpose" text NOT NULL,
	"publication_id" integer,
	"locale" varchar(5) DEFAULT 'en' NOT NULL,
	"status" "request_status" DEFAULT 'pending' NOT NULL,
	"admin_notes" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "metrics" (
	"id" serial PRIMARY KEY NOT NULL,
	"key" varchar(80) NOT NULL,
	"group" "metric_group" DEFAULT 'impact' NOT NULL,
	"value_en" varchar(40) NOT NULL,
	"value_id" varchar(40) NOT NULL,
	"label_en" varchar(160) NOT NULL,
	"label_id" varchar(160) NOT NULL,
	"icon" text,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "metrics_key_unique" UNIQUE("key")
);
--> statement-breakpoint
CREATE TABLE "publications" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar(160) NOT NULL,
	"type" "publication_type" DEFAULT 'paper' NOT NULL,
	"title_en" text NOT NULL,
	"title_id" text NOT NULL,
	"abstract_en" text DEFAULT '' NOT NULL,
	"abstract_id" text DEFAULT '' NOT NULL,
	"authors" text DEFAULT '' NOT NULL,
	"published_on" date,
	"file_size" varchar(40),
	"pages" varchar(40),
	"tags" text[] DEFAULT '{}' NOT NULL,
	"image_url" text,
	"file_url" text,
	"doi" varchar(200),
	"sort_order" integer DEFAULT 0 NOT NULL,
	"published" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "publications_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "team_members" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar(120) NOT NULL,
	"name" varchar(160) NOT NULL,
	"role_en" varchar(200) NOT NULL,
	"role_id" varchar(200) NOT NULL,
	"categories" "team_category"[] DEFAULT '{}' NOT NULL,
	"image_url" text,
	"short_bio_en" text DEFAULT '' NOT NULL,
	"short_bio_id" text DEFAULT '' NOT NULL,
	"bio_en" text DEFAULT '' NOT NULL,
	"bio_id" text DEFAULT '' NOT NULL,
	"expertise" text[] DEFAULT '{}' NOT NULL,
	"email" varchar(200),
	"linkedin_url" text,
	"publications_url" text,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"published" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "team_members_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
ALTER TABLE "data_requests" ADD CONSTRAINT "data_requests_publication_id_publications_id_fk" FOREIGN KEY ("publication_id") REFERENCES "public"."publications"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "contact_messages_status_idx" ON "contact_messages" USING btree ("status","created_at");--> statement-breakpoint
CREATE INDEX "data_requests_status_idx" ON "data_requests" USING btree ("status","created_at");--> statement-breakpoint
CREATE INDEX "publications_date_idx" ON "publications" USING btree ("published_on");--> statement-breakpoint
CREATE INDEX "team_members_sort_idx" ON "team_members" USING btree ("sort_order");