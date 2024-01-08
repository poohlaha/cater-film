#include <stdint.h>

typedef struct {
    char *name;
    char *class;
    char *area;
    char *lang;
    char *year;
    char *sort;
    uint64_t page;
    char *tid;
    char *text;
} COrder;


typedef struct {
    char *key;
    char *value;
} HashMapEntry;

typedef struct {
    char *name;
    uint16_t code;
    size_t num_headers;
    HashMapEntry *headers;
    char *body;
    char *error;
} CHttpResponse;

typedef struct {
    CHttpResponse *data;
    char *error;
} CResult;

extern void handle(const char *name, const COrder *order, CResult **result);
extern void free_c_result(CResult *result);
extern void free_c_http_response(CHttpResponse *response);
extern void free_c_order(COrder *c_order);
